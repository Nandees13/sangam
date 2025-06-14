'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type AboutContent = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
};

export default function AboutForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Fetch existing about content on mount
  useEffect(() => {
    const fetchAboutContent = async () => {
      const { data, error } = await supabase
        .from('about')
        .select('id, title, description, image_url, created_at')
        .eq('id', '421741e7-b5ac-4f62-a0f8-77bc46d4e5e9')
        .single();

      if (error) {
        console.error('Error fetching about content:', error);
        toast.error('Failed to load about content');
        return;
      }

      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setPreviewUrl(data.image_url);
        setExistingImageUrl(data.image_url);
      }
    };

    fetchAboutContent();
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

    try {
      setIsSubmitting(true);

      let imageUrl = existingImageUrl;
      if (image) {
        // Delete old image if it exists
        if (existingImageUrl) {
          const oldFilePath = existingImageUrl.split('/').pop();
          await supabase.storage
            .from('about-images')
            .remove([oldFilePath!]);
        }

        // Upload new image
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('about-images')
          .upload(fileName, image);

        if (uploadError) {
          throw new Error('Failed to upload image');
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('about-images')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      // Update about content
      const { error } = await supabase
        .from('about')
        .update({
          title,
          description,
          image_url: imageUrl,
        })
        .eq('id', '421741e7-b5ac-4f62-a0f8-77bc46d4e5e9');

      if (error) {
        throw new Error('Failed to update about content');
      }

      toast.success('About content updated successfully');
      setExistingImageUrl(imageUrl);
      router.push('/adpage');
    } catch (error) {
      console.error('Error updating about content:', error);
      toast.error('Failed to update about content');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit About Content</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
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
              />
              {previewUrl && (
                <div className="mt-2 relative h-48 rounded-md overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Update About Content'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}