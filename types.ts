import { Auth } from "home-assistant-js-websocket";

export interface HomeAssistantInstance {
  locationName: string;
  uuid: string;
  version: string;
  externalUrl: string;
  internalUrl: string;
  baseUrl: string;
  requiresApiPassword: boolean;
}

export enum ConnectionStatus {
  Disconnected,
  Reconnecting,
  Connected,
}