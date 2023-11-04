import { log } from "console";
import { generateHeader } from "./signature";

const BASE_URL = "https://api.switch-bot.com/v1.1";

export async function getDevices() {
  const endpoint = `${BASE_URL}/devices`;
  const headers = generateHeader();

  log(`Connecting to ${endpoint}`);

  const response = await fetch(endpoint, {
    headers,
  });

  const json = (await response.json()).body.deviceList;

  const devices = JSON.stringify(json, null, "  ");

  return devices;
}
