import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    localStorage.getItem("login") === "true"
      ? setIsLogin(true)
      : setIsLogin(false);
  }, []);

  const value = {
    isLogin,
    setIsLogin  
    }
  return <UserContext.Provider value={value} {...props}/>;
};