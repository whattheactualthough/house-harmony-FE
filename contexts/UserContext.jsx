import React, { createContext, useContext, useState } from "react";

const defaultUser = {
  id: 1,
  user_name: "Kiran",
  group_name: "House Harmony Rd",
  image_url: "",
  is_admin: true,
  badges_earned: null,
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const logIn = (e) => {
    e?.preventDefault?.();
    setUser(defaultUser);
  };
  return (
    <UserContext.Provider value={{ user, logIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
