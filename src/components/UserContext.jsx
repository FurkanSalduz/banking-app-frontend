import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı ID'sini al
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const setUser = (id) => {
    setUserId(id);
    localStorage.setItem("userId", id);
  };

  const clearUser = () => {
    setUserId(null);
    localStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider value={{ userId, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
