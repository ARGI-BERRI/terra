import { log } from "console";
import { generateHeader } from "./signature";

const BASE_URL = "https://api.switch-bot.com/v1.1";

async function fetchAPI(endpoint: string) {
  log(`Connecting to ${endpoint}`);

  const headers = generateHeader();
  const response = await fetch(endpoint, { headers });
  const json = (await response.json()).body;

  return json;
}

// https://github.com/OpenWonderLabs/SwitchBotAPI?tab=readme-ov-file#devices
interface Device {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  enableCloudService: boolean;
  hubDeviceId: string;
}

export async function getDevices(): Promise<Device[]> {
  const endpoint = `${BASE_URL}/devices`;
  const devices = (await fetchAPI(endpoint)).deviceList;

  return devices;
}

export async function getDeviceStatus(deviceId: string) {
  const endpoint = `${BASE_URL}/devices/${deviceId}/status`;
  const json = await fetchAPI(endpoint);

  return json;
}
