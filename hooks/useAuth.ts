import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const { 
    auth,
    refresh,
    connect, 
    logout,
  } = useContext(AuthContext);

  return {
    auth,
    connect,
    refresh,
    logout,
  };
};

export default useAuth;
