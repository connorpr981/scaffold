'use client'

import Link from 'next/link';
import { useUser } from '../contexts/UserContext';
import { signOut } from 'next-auth/react';

export default function Header() {
  const { userData, status } = useUser();

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          My App
        </Link>
        <nav>
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : status === 'authenticated' ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {userData?.name || 'User'}</span>
              <Link href="/projects" className="hover:underline">
                Projects
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/auth/signin" className="hover:underline">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}