import { Gauge, collectDefaultMetrics, register } from "prom-client";
import { Hub, Plug, getDeviceStatus } from "./api";

// Default and recommended metrics of the exporter itself
collectDefaultMetrics();

// NOTE: Descriptions are excerpts from https://github.com/OpenWonderLabs/SwitchBotAPI
const temperature = new Gauge({
  name: "switchbot_temperature",
  help: "temperature in celsius",
  labelNames: ["location"],
});

const humidity = new Gauge({
  name: "switchbot_humidity",
  help: "humidity percentage",
  labelNames: ["location"],
});

const lightLevel = new Gauge({
  name: "switchbot_lightlevel",
  help: "the level of illuminance of the ambience light, 1~20",
  labelNames: ["location"],
});

const voltage = new Gauge({
  name: "switchbot_voltage",
  help: "the voltage of the device, measured in Volt",
  labelNames: ["location"],
});

const weight = new Gauge({
  name: "switchbot_weight",
  help: "the power consumed in a day, measured in Watts",
  labelNames: ["location"],
});

const electricityOfDay = new Gauge({
  name: "switchbot_electricityOfDay",
  help: "the duration that the device has been used during a day, measured in minutes",
  labelNames: ["location"],
});

const electricCurrent = new Gauge({
  name: "switchbot_electricCurrent",
  help: "the current of the device at the moment, measured in Amp",
  labelNames: ["location"],
});

const LIVING_ROOM = { location: "living_room" };
const MY_ROOM = { location: "my_room" };

export async function getMetrics() {
  const deviceIds = process.env.SWITCHBOT_DEVICE_IDS.split(",");
  const livingRoomHub: Hub = await getDeviceStatus(deviceIds[0]);
  const myRoomPlug: Plug = await getDeviceStatus(deviceIds[1]);

  // Living Room
  temperature.set(LIVING_ROOM, livingRoomHub.temperature);
  humidity.set(LIVING_ROOM, livingRoomHub.humidity);
  lightLevel.set(LIVING_ROOM, livingRoomHub.lightLevel);

  // My Room
  voltage.set(MY_ROOM, myRoomPlug.voltage);
  weight.set(MY_ROOM, myRoomPlug.weight);
  electricityOfDay.set(MY_ROOM, myRoomPlug.electricityOfDay);
  electricCurrent.set(MY_ROOM, myRoomPlug.electricCurrent);

  return await register.metrics();
}
