import React from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  sidebar: React.ReactNode;
}

export function MainLayout({ sidebar }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Adjusted padding and gap */}
      <main className="px-8 py-8 grid grid-cols-1 md:grid-cols-[400px_1fr] gap-8 md:gap-x-12 lg:gap-x-16">
        <aside className="flex flex-col gap-8">
          {sidebar}
        </aside>
        <section className="flex flex-col gap-10">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
