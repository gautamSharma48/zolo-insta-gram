import { createContext, useContext, useEffect, useState } from "react";
import { IContextType, IUser } from "../../lib/types";
import { useNavigate } from "react-router-dom";
import { AppWrite } from "@/services";

const INITIAL_USER: any = {
  id: "",
  name: "",
  userName: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE: any = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount: any = await new AppWrite().getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //const cookieFallback = localStorage.getItem("cookieFallback");
    // if (
    //   cookieFallback === "[]" ||
    //   cookieFallback === null ||
    //   cookieFallback === undefined
    // ) {
    //   navigate("/sign-in");
    // }

    checkAuthUser();
  }, [navigate]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
