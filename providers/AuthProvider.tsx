/* eslint-disable react-hooks/exhaustive-deps */
import {
  Auth,
  ERR_CANNOT_CONNECT,
  ERR_CONNECTION_LOST,
  ERR_HASS_HOST_REQUIRED,
  ERR_INVALID_AUTH,
  ERR_INVALID_HTTPS_TO_HTTP,
  getAuth,
} from "home-assistant-js-websocket";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import useAuthStore from "../stores/auth.store";
import useHassStore from "../stores/hass.store";
import { HomeAssistantInstance } from "../types";

const AuthWrapper: React.FunctionComponent = ({ children }) => {
  const router = useRouter();
  const {
    saveAuthData,
    loadAuthData,
  } = useAuthStore();
  const auth = useRef<Auth | undefined>();
  const [loading, setLoading] = useState(false);

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
        : internalUrl
    })
  }

  const logout = () => {
    useHassStore.destroy();
    useAuthStore.destroy();
    localStorage.clear();
    auth.current = undefined;
    router.push('/auth');
  }
  

  const _getAuth = async () => {
    setLoading(true);
    try {
      const a = await getAuth({
        saveTokens: saveAuthData,
        loadTokens: loadAuthData,
      });
      if (a && a.accessToken) {
        console.log('authed')
        auth.current = a;
      }
    } catch (err) {
      switch (err) {
        case ERR_HASS_HOST_REQUIRED:
          router.push('/auth');
          break;
        case ERR_INVALID_AUTH:
          console.log('Invalid auth.');
          break;
        case ERR_CANNOT_CONNECT:
          console.log('Can\'t connect.');
          break;
        case ERR_INVALID_HTTPS_TO_HTTP:
          console.log('Invalid HTTPS to HTTP.');
          break;
        case ERR_CONNECTION_LOST:
          console.log('Connection lost.');
          break;
        default:
          break;
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    _getAuth();
  }, []);

  return loading ? null : (
    <AuthContext.Provider
      value={{
        auth: auth.current,
        connect,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
