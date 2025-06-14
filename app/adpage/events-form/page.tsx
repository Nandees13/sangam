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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string | null;
  image_url: string | null;
};

export default function EventsForm() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*');
      
      if (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
        return;
      }
      
      setEvents(data || []);
    };

    fetchEvents();
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
    
    // Combine date and time
    const datetime = `${date}T${time || '00:00'}`;
    
    try {
      setIsSubmitting(true);
      
      let imageUrl = editingEvent?.image_url || null;
      if (image) {
        // Upload image to Supabase storage
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(fileName, image);
        
        if (uploadError) {
          throw new Error('Failed to upload image');
        }
        
        // Get public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('event-images')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }

      if (editingEvent) {
        // Update event in Supabase
        const { error } = await supabase
          .from('events')
          .update({
            title,
            description,
            date: datetime,
            location: location || null,
            image_url: imageUrl,
          })
          .eq('id', editingEvent.id);
        
        if (error) {
          throw new Error('Failed to update event');
        }
        
        toast.success('Event updated successfully');
      } else {
        // Create new event in Supabase
        const { error } = await supabase
          .from('events')
          .insert({
            title,
            description,
            date: datetime,
            location: location || null,
            image_url: imageUrl,
          });
        
        if (error) {
          throw new Error('Failed to create event');
        }
        
        toast.success('Event created successfully');
      }
      
      setIsDialogOpen(false);
      resetForm();
      
      // Refresh events
      const { data } = await supabase.from('events').select('*');
      setEvents(data || []);
      
      router.push('/adpage'); // Redirect to /adpage
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error('Failed to delete event');
      }
      
      toast.success('Event deleted successfully');
      setConfirmDeleteId(null);
      
      // Refresh events
      const { data } = await supabase.from('events').select('*');
      setEvents(data || []);
      
      router.push('/adpage'); // Redirect to /adpage
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setImage(null);
    setPreviewUrl(null);
    setEditingEvent(null);
  };

  // Open edit dialog
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    const [eventDate, eventTime] = event.date.split('T');
    setDate(eventDate);
    setTime(eventTime?.substring(0, 5) || ''); // Get HH:mm from time
    setLocation(event.location || '');
    setPreviewUrl(event.image_url);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <Button onClick={() => {
          resetForm();
          setIsDialogOpen(true);
        }}>
          Add New Event
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="relative w-32 h-24 rounded-md overflow-hidden flex-shrink-0">
                    {event.image_url && (
                      <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(event.date).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.location || 'No location provided'}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => setConfirmDeleteId(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No events found. Click "Add New Event" to create one.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </DialogTitle>
            <DialogDescription>
              {editingEvent 
                ? 'Update the event details below.' 
                : 'Fill in the details below to add a new event.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter event location"
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
                ) : editingEvent ? 'Update Event' : 'Add Event'}
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
              Are you sure you want to delete this event? This action cannot be undone.
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