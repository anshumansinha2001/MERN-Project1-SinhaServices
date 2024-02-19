// Context API :- its a feature that allows you to share state data between components without explicity passing the data through each level of the component tree.it doesnt matter the components are connected toeath other or not.

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Provider component is responsible for "providing" the data (context) to its desendants.
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  const authorizationToken = `Bearer ${token}`;

  // const API = "http://localhost:5000";
  const API = import.meta.env.VITE_APP_URI_API;

  //Tackling token storage functionality
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log("isLoggedIn:", isLoggedIn);

  //Tackling the Logout functionality
  const LogoutUser = () => {
    setToken("");
    setUser("");
    return localStorage.removeItem("token");
  };

  // JWT AUTHENTICATION - to get the currently loggedIn user data
  const userAuthentication = async () => {
    try {
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data ", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.error("Error fecting user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fecting user data");
    }
  };

  // Fetching the Services Data from the DataBase
  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    getServices();
    userAuthentication();
  }, [token]);

  //Consumer
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Delivery agent
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
