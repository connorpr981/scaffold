'use client'

import Link from 'next/link';
import { useUser } from '../contexts/UserContext';
import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";

export default function Header() {
  const { userData, status } = useUser();

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Scaffold
        </Link>
        <nav>
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : status === 'authenticated' ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {userData?.name || 'User'}</span>
              <Button asChild variant="ghost">
                <Link href="/projects">Projects</Link>
              </Button>
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="destructive"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}