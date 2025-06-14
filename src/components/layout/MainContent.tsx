import React from 'react';

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 bg-gray-50 min-h-screen">
      {children}
    </main>
  );
}
