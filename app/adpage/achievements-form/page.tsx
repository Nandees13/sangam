'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string | null; // Allow null for optional image
};

export default function AchievementsForm() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch achievements on mount
  useEffect(() => {
    const fetchAchievements = async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*');
      
      if (error) {
        console.error('Error fetching achievements:', error);
        toast.error('Failed to load achievements');
        return;
      }
      
      setAchievements(data || []);
    };

    fetchAchievements();
  }, []);

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setImage(file);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image && !editingAchievement) {
      toast.error('Please select an image for new achievements');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      let imageUrl = editingAchievement?.image_url || null;
      if (image) {
        // Upload image to Supabase storage
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('achievement-images')
          .upload(fileName, image);
        
        if (uploadError) {
          throw new Error('Failed to upload image');
        }
        
        // Get public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('achievement-images')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }

      if (editingAchievement) {
        // Update achievement in Supabase
        const { error } = await supabase
          .from('achievements')
          .update({
            title,
            description,
            date,
            image_url: imageUrl,
          })
          .eq('id', editingAchievement.id);
        
        if (error) {
          throw new Error('Failed to update achievement');
        }
        
        toast.success('Achievement updated successfully');
      } else {
        // Create new achievement in Supabase
        const { error } = await supabase
          .from('achievements')
          .insert({
            title,
            description,
            date,
            image_url: imageUrl,
          });
        
        if (error) {
          throw new Error('Failed to create achievement');
        }
        
        toast.success('Achievement created successfully');
      }
      
      // Refresh achievements
      const { data } = await supabase.from('achievements').select('*');
      setAchievements(data || []);
      
      setIsDialogOpen(false);
      resetForm();
      router.push('/adpage'); // Redirect after save
    } catch (error) {
      console.error('Error saving achievement:', error);
      toast.error('Failed to save achievement');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error('Failed to delete achievement');
      }
      
      toast.success('Achievement deleted successfully');
      setConfirmDeleteId(null);
      
      // Refresh achievements
      const { data } = await supabase.from('achievements').select('*');
      setAchievements(data || []);
      
      router.push('/adpage'); // Redirect after delete
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast.error('Failed to delete achievement');
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setImage(null);
    setPreviewUrl(null);
    setEditingAchievement(null);
  };

  // Open edit dialog
  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setTitle(achievement.title);
    setDescription(achievement.description);
    setDate(achievement.date.split('T')[0]); // Format date for input
    setPreviewUrl(achievement.image_url);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Achievements</h1>
        <Button onClick={() => {
          resetForm();
          setIsDialogOpen(true);
        }}>
          Add New Achievement
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {achievements.length > 0 ? (
            <div className="space-y-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="relative w-32 h-24 rounded-md overflow-hidden flex-shrink-0">
                    {achievement.image_url && (
                      <Image
                        src={achievement.image_url}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(achievement)}>
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => setConfirmDeleteId(achievement.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No achievements found. Click "Add New Achievement" to create one.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
            </DialogTitle>
            <DialogDescription>
              {editingAchievement 
                ? 'Update the achievement details below.' 
                : 'Fill in the details below to add a new achievement.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter achievement title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter achievement description"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingAchievement}
              />
              {previewUrl && (
                <div className="mt-2 relative h-40 rounded-md overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : editingAchievement ? 'Update Achievement' : 'Add Achievement'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this achievement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}