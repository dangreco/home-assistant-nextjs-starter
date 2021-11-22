import {
  Auth,
  Connection,
  createConnection,
  ERR_HASS_HOST_REQUIRED,
  ERR_INVALID_AUTH,
  getAuth,
} from "home-assistant-js-websocket";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import useAuthStore from "../stores/auth.store";
import useHassStore from "../stores/hass.store";
import { HomeAssistantInstance } from "../types";

const AuthWrapper: React.FunctionComponent = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState<Auth | undefined>();

  const connect = async (
    instance: HomeAssistantInstance,
    preferExternal?: boolean,
  ) => {
    const {
      internalUrl,
      externalUrl,
    } = instance;

    return await getAuth({
      hassUrl: preferExternal 
        ? externalUrl || internalUrl
        : internalUrl,
      saveTokens: useAuthStore.setState,
    })
  }

  const _getAuth = async () => {
    try {
      const _auth = await getAuth({
        saveTokens: useAuthStore.setState,
        loadTokens: async () => useAuthStore.getState(),
      });
      setAuth(_auth);
    } catch (err) {

    }
  }

  const logout = (connection: Connection) => {
    useAuthStore.setState({});
    useHassStore.setState({});
    localStorage.clear();
    connection?.close();
    router.push('/auth');
  }

  useEffect(() => {
    if (!auth) _getAuth();
  }, [router]);


  return (
    <AuthContext.Provider
      value={{
        auth,
        refresh: () => {},
        connect,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
