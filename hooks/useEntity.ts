import { HassEntity } from "home-assistant-js-websocket";
import useHass from "./useHass";

const useEntity = (entityId: string) : HassEntity | undefined => {
  const {
    entities,
  } = useHass();

  return entities? entities[entityId] : undefined;
}

export default useEntity;