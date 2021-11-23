import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const { 
    auth,
    connect, 
    logout,
  } = useContext(AuthContext);

  return {
    auth,
    connect,
    logout,
  };
};

export default useAuth;
