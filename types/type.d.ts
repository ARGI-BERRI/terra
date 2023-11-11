declare module NodeJS {
  interface ProcessEnv {
    readonly SWITCHBOT_TOKEN: string;
    readonly SWITCHBOT_SECRET: string;
    readonly SWITCHBOT_DEVICE_IDS: string;
  }
}
