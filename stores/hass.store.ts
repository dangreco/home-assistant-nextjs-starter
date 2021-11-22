import { 
  Connection, 
  HassConfig, 
  HassEntities, 
  HassServices 
} from "home-assistant-js-websocket";
import create from "zustand";

interface HassStore {
  connection?: Connection;
  entities: HassEntities;
  services: HassServices;
  config: Partial<HassConfig>;
}

const useHassStore = create<HassStore>(
  (get, set) => ({
    entities: {},
    services: {},
    config: {},
  })
);

export default useHassStore;