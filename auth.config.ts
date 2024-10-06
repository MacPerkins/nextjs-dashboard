import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true; // Allow access to dashboard if logged in
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Ensure the redirect URL uses the correct base URL
        const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'https://nextjs-dashboard-eight-beryl-87.vercel.app';
        return Response.redirect(new URL(`${baseUrl}/dashboard`, nextUrl));
      }

      return true; // Allow access to non-dashboard routes
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
