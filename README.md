# terra

## Purpose

**Terra** is an application for telemetry of my (or your) house. Terra watches Switchbot devices, collect their telemetry, and send them to the visualize server.

Terra runs with Switchbot clusters, so you have to prepare them prior to use this application.

## System structure

- Everything is on the Docker container.
- Terra to watch Switchbot devices and send telemetry
- InfluxDB(?) to collect telemetry
- Grafana to visualize telemetry

## Developing

### Environment Variables

`.env` in the root directry will used for the store.

#### `SWITCHBOT_TOKEN`

TBA

#### `SWITCHBOT_SECRET`

TBA

### Scripts

#### `pnpm build`

This will watch the whole program within `/src` and (re)build the program when files is updated.

#### `pnpm start`

This will launch the main program (`main.ts`).
