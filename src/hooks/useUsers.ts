import { User } from "@prisma/client";
import { useState, useEffect } from "react";

interface UseUsersReturn {
  usersList: User[];
  isLoading: boolean;
  addUser: (userData: { name: string; email: string }) => Promise<boolean>;
}

export const useUsers = (): UseUsersReturn => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchUsers = async () => {
    try {
      setIsLoading(true);
     
      const response = await fetch("/api/users");
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUsersList(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (userData: { name: string; email: string }): Promise<boolean> => {
    try {
      
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error("Failed to add user:", response.statusText);
        return false;
      }

      const newUser = await response.json();
      setUsersList(prev => [...prev, newUser]);
      return true;
    } catch (err) {
   
      console.error("Error adding user:", err);
      return false;
    }
  };

 
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    usersList,
    isLoading,
    addUser,
  };
};