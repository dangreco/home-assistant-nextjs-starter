import { Auth, Connection } from 'home-assistant-js-websocket';
import React, { createContext } from 'react';
import { HomeAssistantInstance } from '../types';

interface AuthContextValues {
  auth: Auth | undefined;
  connect(
    instance: HomeAssistantInstance,
    preferExternal?: boolean,
  ): Promise<Auth | undefined>;
  logout(connection: Connection): void;
}

const AuthContext = createContext<AuthContextValues>({
  auth: undefined,
  connect: async () => undefined,
  logout: () => {},
});

export default AuthContext;