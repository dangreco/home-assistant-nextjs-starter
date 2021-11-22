import { Auth, Connection } from 'home-assistant-js-websocket';
import React, { createContext } from 'react';
import { HomeAssistantInstance } from '../types';

interface AuthContextValues {
  auth?: Auth;
  refresh(): void;
  connect(
    instance: HomeAssistantInstance,
    preferExternal?: boolean,
  ): Promise<Auth | undefined>;
  logout(connection: Connection): void;
}

const AuthContext = createContext<AuthContextValues>({
  refresh: () => {},
  connect: async () => undefined,
  logout: () => {},
});

export default AuthContext;