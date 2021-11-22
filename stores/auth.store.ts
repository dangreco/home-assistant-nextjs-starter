import { AuthData } from "home-assistant-js-websocket";
import create from "zustand";
import { persist } from 'zustand/middleware';
import { APP_NAME } from "../utils/config";

const useAuthStore = create<AuthData | null>(
  persist(
    () => null,
    {
      name: `${APP_NAME}:auth`
    }
  )
);

export default useAuthStore;