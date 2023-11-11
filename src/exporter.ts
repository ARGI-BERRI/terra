import { collectDefaultMetrics, register } from "prom-client";
import { getDeviceStatus } from "./api";

export async function getMetrics() {
  const defaults = await register.metrics();

  const deviceIds = process.env.SWITCHBOT_DEVICE_IDS.split(",");
  const livingRoom = await getDeviceStatus(deviceIds[0]);
  const myRoom = await getDeviceStatus(deviceIds[1]);

  const metrics = [];

  metrics.push(
    createMetric({
      name: "switchbot_temperature",
      help: "temperature in celsius",
      labels: { location: "living_room" },
      type: "gauge",
      value: livingRoom.temperature,
    }),
  );

  metrics.push(
    createMetric({
      name: "switchbot_humidity",
      help: "humidity percentage",
      labels: { location: "living_room" },
      type: "gauge",
      value: livingRoom.humidity,
    }),
  );

  metrics.push(
    createMetric({
      name: "switchbot_lightlevel",
      help: "the level of illuminance of the ambience light, 1~20",
      labels: { location: "living_room" },
      type: "gauge",
      value: livingRoom.lightlevel,
    }),
  );

  metrics.push(
    createMetric({
      name: "switchbot_voltage",
      help: "the voltage of the device, measured in Volt",
      labels: { location: "my_room" },
      type: "gauge",
      value: myRoom.voltage,
    }),
  );

  metrics.push(
    createMetric({
      name: "switchbot_weight",
      help: "the power consumed in a day, measured in Watts",
      labels: { location: "my_room" },
      type: "gauge",
      value: myRoom.weight,
    }),
  );

  metrics.push(
    createMetric({
      name: "switchbot_electricityOfDay",
      help: "the duration that the device has been used during a day, measured in minutes",
      labels: { location: "my_room" },
      type: "gauge",
      value: myRoom.electricityOfDay,
    }),
  );

  metrics.push(
    createMetric({
      name: "switchbot_electricCurrent",
      help: "the current of the device at the moment, measured in Amp",
      labels: { location: "my_room" },
      type: "gauge",
      value: myRoom.electricCurrent,
    }),
  );

  return defaults + `\n${metrics.join("\n\n")}`;
}

function createMetric(metric: {
  name: string;
  help: string;
  type: "gauge" | "counter";
  labels?: { [key: string]: string };
  value: any;
}) {
  const HELP = `# HELP ${metric.name} ${metric.help}`;
  const TYPE = `# TYPE ${metric.name} ${metric.type}`;

  let labels = "";

  console.log(metric.labels);

  if (metric.labels) {
    labels = Object.keys(metric.labels)
      .map((key) => {
        return `${key}="${metric.labels?.[key]}"`;
      })
      .join(",");
    console.log(labels);
    labels = `{${labels}}`;
  }

  const METRIC = `${metric.name}${labels} ${metric.value}`;

  return `${HELP}\n${TYPE}\n${METRIC}`;
}

export async function registerMetrics() {
  // Default and recommended metrics of the exporter itself
  collectDefaultMetrics();
}
