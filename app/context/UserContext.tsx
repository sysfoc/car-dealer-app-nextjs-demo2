"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  role: string;
  profilePicture: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  refreshUser: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/users/me", {
      credentials: 'include'
    });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


// const fetchUser = async () => {
//   setLoading(true);
//   try {
//     const res = await fetch("/api/users/me", {
//       credentials: 'include'
//     });
    
//     if (!res.ok) {
//       throw new Error(`Failed to fetch user: ${res.status}`);
//     }

//     const data = await res.json();
    
//     // Check for both response formats
//     const userData = data.user || data;
    
//     if (userData) {
//       setUser({
//         id: userData._id || userData.id,
//         email: userData.email,
//         role: userData.role,
//         profilePicture: userData.profilePicture || "/userPicture.jpg"
//       });
//     } else {
//       setUser(null);
//     }
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     setUser(null);
//   } finally {
//     setLoading(false);
//   }
// };