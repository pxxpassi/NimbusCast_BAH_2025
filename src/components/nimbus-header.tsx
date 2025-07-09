'use client';

import Link from 'next/link';
import { CloudSun, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';

export function NimbusHeader() {
  return (
    <header className="bg-card border-b border-border/80 shadow-sm sticky top-0 z-10 bg-opacity-80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <CloudSun className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold font-headline text-foreground">
              NimbusCast
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/contribute">
              <Users className="w-5 h-5 mr-2" />
              Contribute
            </Link>
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
