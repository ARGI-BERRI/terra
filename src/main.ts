import { promises as fs } from "fs";
import { log } from "console";
import { getDevices } from "./api";

const devices = await getDevices();

try {
  await fs.mkdir("./resources");
} catch (_) {
  // NOTE: フォルダが存在する場合ここに到達するが、何もしない
}

await fs.writeFile("./resources/devices.json", devices);
log(devices);
