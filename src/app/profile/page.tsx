'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Profile Not Available</h1>
      <p className="text-muted-foreground mb-6">User profiles have been disabled in this application.</p>
      <Button asChild>
          <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
