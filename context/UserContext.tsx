"use client";
import { createContext, useState, useContext } from 'react';
import {UserData} from '@/utils/interface';

// Create a Context for the user data
const UserContext = createContext<UserContextProps|null>(null);

interface UserContextProps{
    currentUser: UserData|null;
    setCurrentUser: any;
}

// Provider component to wrap your app
export const UserProvider = ({ children}:any) => {
  const [currentUser, setCurrentUser] = useState<UserData|null>(null);

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
