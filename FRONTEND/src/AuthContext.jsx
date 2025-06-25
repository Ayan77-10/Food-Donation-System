import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "./helper/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setUserRole(response.data.user.role);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
