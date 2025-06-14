'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getUserSession } from '@/lib/auth';

export default function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getUserSession();
        
        // If not authenticated and not already on the login page, redirect to login
        if (!session && pathname !== '/adpage/login') {
          router.replace('/adpage/login');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/adpage/login');
      }
    };
    
    checkAuth();
  }, [router, pathname]);
  
  if (isLoading && pathname !== '/adpage/login') {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/30">
        <div className="text-center">
          <div className="inline-block animate-spin mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
          </div>
          <span className="text-lg font-medium">Authenticating...</span>
        </div>
      </div>
    );
  }
  
  return children;
}