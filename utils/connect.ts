import { getAuth } from "home-assistant-js-websocket";
import useAuthStore from "../stores/auth.store";
import { HomeAssistantInstance } from "../types";

const connect = async (
  instance: HomeAssistantInstance,
  preferExternal?: boolean,
) => {
  const {
    internalUrl,
    externalUrl
  } = instance;

  return getAuth({
    hassUrl: preferExternal ? externalUrl || internalUrl : internalUrl,
    saveTokens: useAuthStore.setState,
  });
}

export default connect;