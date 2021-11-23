import { AuthData } from "home-assistant-js-websocket";
import create from "zustand";
import { persist } from 'zustand/middleware';
import { APP_NAME } from "../utils/config";

export interface AuthStore {
  authData: AuthData | null;
  saveAuthData(authData: AuthData | null): void;
  loadAuthData(): Promise<AuthData | null>; 
}

const useAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
      authData: null,
      saveAuthData: authData => set({ authData }),
      loadAuthData: async () => get().authData,
    }),
    {
      name: `${APP_NAME}:auth`
    }
  )
);

export default useAuthStore;