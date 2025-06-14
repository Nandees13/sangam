'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
import { supabase, createHeroImage, updateHeroImage, deleteHeroImage } from '@/lib/supabase-client';
import Image from 'next/image';

type HeroImage = {
  id: string;
  image_url: string;
  caption: string;
  created_at: string;
};

export default function HeroForm() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCaption, setNewCaption] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const router = useRouter();
  
  // Fetch hero images on component mount
  useEffect(() => {
    async function fetchHeroImages() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('hero_images')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setHeroImages(data || []);
      } catch (error) {
        console.error('Error fetching hero images:', error);
        toast.error('Failed to load hero images');
      } finally {
        setLoading(false);
      }
    }
    
    fetchHeroImages();
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
    
    setNewImage(file);
  };
  
  // Submit new hero image
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newImage) {
      toast.error('Please select an image');
      return;
    }
    
    if (!newCaption.trim()) {
      toast.error('Please enter a caption');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (editingImage) {
        // Update existing hero image
        const updated = await updateHeroImage(
          editingImage.id,
          newCaption,
          newImage
        );
        
        // Update state
        setHeroImages(prev => 
          prev.map(img => img.id === editingImage.id ? updated : img)
        );
        
        toast.success('Hero image updated successfully');
      } else {
        // Create new hero image
        const created = await createHeroImage(newCaption, newImage);
        
        // Update state
        setHeroImages(prev => [created, ...prev]);
        
        toast.success('Hero image created successfully');
      }
      
      // Reset form
      setNewCaption('');
      setNewImage(null);
      setPreviewUrl(null);
      setEditingImage(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving hero image:', error);
      toast.error('Failed to save hero image');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Open edit dialog
  const handleEdit = (image: HeroImage) => {
    setEditingImage(image);
    setNewCaption(image.caption);
    setPreviewUrl(image.image_url);
    setNewImage(null); // Clear any previously selected file
    setIsDialogOpen(true);
  };
  
  // Handle delete hero image
  const handleDelete = async (id: string) => {
    try {
      await deleteHeroImage(id);
      
      // Update state
      setHeroImages(prev => prev.filter(img => img.id !== id));
      
      toast.success('Hero image deleted successfully');
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Error deleting hero image:', error);
      toast.error('Failed to delete hero image');
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Hero Images</h1>
        <Button onClick={() => {
          setEditingImage(null);
          setNewCaption('');
          setNewImage(null);
          setPreviewUrl(null);
          setIsDialogOpen(true);
        }}>
          Add New Hero Image
        </Button>
      </div>
      
      {/* Hero Images List */}
      <Card>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin mr-2">
                <svg xmlns="http://www.w3.org/2000/svg\" width="24\" height="24\" viewBox="0 0 24 24\" fill="none\" stroke="currentColor\" strokeWidth="2\"  strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
              </div>
              <span>Loading hero images...</span>
            </div>
          ) : heroImages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Caption</TableHead>
                  <TableHead className="w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heroImages.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <div className="relative w-24 h-16 rounded-md overflow-hidden">
                        <Image
                          src={image.image_url}
                          alt={image.caption}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{image.caption}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(image)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => setConfirmDeleteId(image.id)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hero images found. Click "Add New Hero Image" to create one.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add/Edit Hero Image Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingImage ? 'Edit Hero Image' : 'Add New Hero Image'}</DialogTitle>
            <DialogDescription>
              {editingImage 
                ? 'Update the hero image details below.' 
                : 'Fill in the details below to add a new hero image.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                placeholder="Enter image caption"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
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
                required={!editingImage}
              />
              {previewUrl && (
                <div className="mt-2 relative h-40 w-full rounded-md overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {editingImage && !newImage && (
                <p className="text-sm text-muted-foreground mt-1">
                  Leave empty to keep the current image.
                </p>
              )}
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : editingImage ? 'Update Hero Image' : 'Add Hero Image'}
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
              Are you sure you want to delete this hero image? This action cannot be undone.
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