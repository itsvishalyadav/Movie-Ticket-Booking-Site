import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(
        "https://getmyseatbackend.onrender.com/api/isLoggedIn",
        { credentials: "include" }
      );
      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
