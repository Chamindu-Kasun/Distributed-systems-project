import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, setUserData, userData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
