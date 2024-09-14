import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type UserContextType = {
  userData: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserContextType['userData']>(null);

  useEffect(() => {
    if (session?.user) {
      setUserData(session.user);
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ userData, status }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};