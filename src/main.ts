import { promises as fs } from "fs";
import { log } from "console";
import { getDeviceStatus, getDevices } from "./api";

const devices = await getDevices();
fs.writeFile("./resources/devices.json", JSON.stringify(devices, null, "  "));
log(devices);

for (const device of devices) {
  const deviceId = device.deviceId;
  const deviceStatus = await getDeviceStatus(deviceId);

  fs.writeFile(
    `./resources/device_${deviceId}.json`,
    JSON.stringify(deviceStatus, null, " "),
  );
}
