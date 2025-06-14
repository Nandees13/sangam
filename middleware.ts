import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  
  // Check if the request is for the admin area (except login page)
<<<<<<< HEAD
  if (pathname.startsWith('/adpage') && !pathname.includes('/login')) {
=======
  if (pathname.startsWith('/project/adpage') && !pathname.includes('/login')) {
>>>>>>> 6ae2606 (new addition)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            res.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            res.cookies.delete({
              name,
              ...options,
            });
          },
        },
      }
    );
    
    // Get the session from the request
    const { data: { session } } = await supabase.auth.getSession();
    
    // If there's no session, redirect to the login page
    if (!session) {
      const redirectUrl = new URL('/adpage/login', req.url);
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  return res;
}

export const config = {
  // Skip static files and API routes
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. All root level files in /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};