import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact Us - Arivial Sangam',
  description: 'Get in touch with Arivial Sangam for inquiries or collaborations.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions or want to get involved? Fill out the form below.
            </p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="First name" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Last name" required />
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email address" required />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Subject" required />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={4} required />
              </div>
              
              <Button type="submit">Send Message</Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4 flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"></path></svg>
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="text-muted-foreground text-sm">
                      123 Community Street, Chennai, Tamil Nadu 600001, India
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-muted-foreground text-sm">+91 98765 43210</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground text-sm">info@arivialsangam.org</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="aspect-w-16 aspect-h-9 bg-card rounded-lg shadow-sm overflow-hidden relative h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3503.9225945861344!2d77.219848!3d28.572087!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3cba62277df%3A0x8bfd5215222e5279!2sVijnana%20Bharati%20HQ!5e0!3m2!1sen!2sin!4v1749876700214!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}