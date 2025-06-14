'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Define navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
<<<<<<< HEAD
    { name: 'Initiatives', href: '/initiatives' },
=======
>>>>>>> 6ae2606 (new addition)
    { name: 'Events', href: '/events' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'News', href: '/news' },
  ];

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300',
      {
        'bg-background/95 backdrop-blur-md shadow-sm': isScrolled,
        'bg-transparent': !isScrolled && pathname === '/',
        'bg-background': !isScrolled && pathname !== '/',
      }
    )}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className={cn(
          'flex items-center gap-2 font-bold text-2xl transition-colors',
          {
            'text-primary': isScrolled || pathname !== '/',
            'text-white': !isScrolled && pathname === '/',
          }
        )}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>Arivial Sangam</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                {
                  'text-primary': pathname === link.href,
                  'text-foreground': pathname !== link.href && (isScrolled || pathname !== '/'),
                  'text-white/90 hover:text-white': !isScrolled && pathname === '/',
                }
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <ThemeToggle 
            className={cn({
              'text-white': !isScrolled && pathname === '/',
            })}
          />
          
          <Button asChild size="sm">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle 
            className={cn({
              'text-white': !isScrolled && pathname === '/',
            })}
          />
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className={cn(
              'text-foreground',
              {
                'text-white': !isScrolled && pathname === '/',
              }
            )}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg\" width="24\" height="24\" viewBox="0 0 24 24\" fill="none\" stroke="currentColor\" strokeWidth="2\" strokeLinecap="round\" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg z-50">
          <ScrollArea className="h-[calc(100vh-4rem)] py-4">
            <div className="container flex flex-col space-y-4 pb-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'py-2 px-4 text-base font-medium rounded-md transition-colors',
                    pathname === link.href 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted hover:text-primary'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t">
                <Button asChild className="w-full">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </header>
  );
}