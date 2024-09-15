'use client'

import Link from 'next/link';
import { useUser } from '../contexts/UserContext';
import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import FeedbackModal from './FeedbackModal'; // We'll create this component next

export default function Header() {
  const { userData, status } = useUser();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Scaffold
        </Link>
        <nav className="flex items-center space-x-4">
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : status === 'authenticated' ? (
            <>
              <span>Welcome, {userData?.name || 'User'}</span>
              <Button asChild variant="ghost">
                <Link href="/projects">Projects</Link>
              </Button>
              <Button
                onClick={() => setIsFeedbackModalOpen(true)}
                variant="outline"
              >
                Feedback
              </Button>
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="destructive"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
      {isFeedbackModalOpen && (
        <FeedbackModal onClose={() => setIsFeedbackModalOpen(false)} />
      )}
    </header>
  );
}