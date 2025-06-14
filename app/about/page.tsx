import { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import { getAboutContent } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About - Arivial Sangam',
  description: 'Learn about Arivial Sangam, our mission, vision, and values.',
};

export default async function AboutPage() {
  const aboutContent = await getAboutContent();
  
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-muted py-12 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground">Our mission, vision, and the journey we've taken</p>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="container py-16 md:py-24">
        <AboutSection content={aboutContent} isPreview={false} />
      </section>
      
      {/* Mission & Vision */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <div className="w-16 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground mb-6">
                Arivial Sangam is dedicated to empowering communities through knowledge sharing, 
                cultural preservation, and innovative initiatives that address local challenges. 
                We strive to create a platform where diverse voices can be heard and collective action 
                can lead to meaningful change.
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <div className="w-16 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground mb-6">
                We envision a thriving, self-reliant community where traditions are honored, knowledge 
                is accessible to all, and sustainable development is achieved through collaboration and 
                innovation. Our goal is to build bridges between generations and cultures, fostering 
                a sense of belonging and shared purpose.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Innovation</h3>
            <p className="text-muted-foreground">Embracing new ideas and approaches to address community challenges.</p>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Integrity</h3>
            <p className="text-muted-foreground">Maintaining honesty and ethical standards in all our actions and decisions.</p>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Inclusivity</h3>
            <p className="text-muted-foreground">Valuing diversity and ensuring that everyone has a voice in our community.</p>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m7 11 2 2 6-6"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Excellence</h3>
            <p className="text-muted-foreground">Striving for the highest quality in everything we do.</p>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Collaboration</h3>
            <p className="text-muted-foreground">Working together with community members and partners to achieve common goals.</p>
          </div>
          
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Sustainability</h3>
            <p className="text-muted-foreground">Ensuring our initiatives create lasting positive impact for future generations.</p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Be a part of Arivial Sangam and help us make a difference in our community.
            Together, we can build a better future for all.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}