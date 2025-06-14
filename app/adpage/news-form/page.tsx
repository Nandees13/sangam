'use client'

import { useState } from 'react';
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
import { createNews, updateNews, deleteNews } from '@/lib/supabase-client';
import { generateSlug } from '@/lib/utils';
import Image from 'next/image';

type NewsArticle = {
  id: string;
  title: string;
  content: string;
  slug: string;
  image_url: string;
  published_at: string;
};

export default function NewsForm() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const router = useRouter();

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
    
    if (!image && !editingArticle) {
      toast.error('Please select an image');
      return;
    }
    
    const slug = generateSlug(title);
    
    try {
      setIsSubmitting(true);
      
      if (editingArticle) {
        await updateNews(editingArticle.id, title, content, slug, image);
        toast.success('News article updated successfully');
      } else {
        if (!image) return;
        await createNews(title, content, slug, image);
        toast.success('News article created successfully');
      }
      
      setIsDialogOpen(false);
      resetForm();
      router.refresh();
    } catch (error) {
      console.error('Error saving news article:', error);
      toast.error('Failed to save news article');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteNews(id);
      toast.success('News article deleted successfully');
      setConfirmDeleteId(null);
      router.refresh();
    } catch (error) {
      console.error('Error deleting news article:', error);
      toast.error('Failed to delete news article');
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setPreviewUrl(null);
    setEditingArticle(null);
  };

  // Open edit dialog
  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setTitle(article.title);
    setContent(article.content);
    setPreviewUrl(article.image_url);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage News</h1>
        <Button onClick={() => {
          resetForm();
          setIsDialogOpen(true);
        }}>
          Add New Article
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {news.length > 0 ? (
            <div className="space-y-6">
              {news.map((article) => (
                <div key={article.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="relative w-32 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold mb-1">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Published: {new Date(article.published_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.content.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => setConfirmDeleteId(article.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No news articles found. Click "Add New Article" to create one.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? 'Edit News Article' : 'Add New News Article'}
            </DialogTitle>
            <DialogDescription>
              {editingArticle 
                ? 'Update the article details below.' 
                : 'Fill in the details below to add a new article.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter article content (HTML supported)"
                rows={10}
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
                required={!editingArticle}
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
                ) : editingArticle ? 'Update Article' : 'Add Article'}
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
              Are you sure you want to delete this article? This action cannot be undone.
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