import { ReactNode } from 'react';
import { Metadata } from 'next';
import AdminSidebar from '@/components/AdminSidebar';
import AdminAuthCheck from '@/components/AdminAuthCheck';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Arivial Sangam',
  description: 'Content management system for Arivial Sangam website',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthCheck>
      <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
        <AdminSidebar />
        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </div>
    </AdminAuthCheck>
  );
}