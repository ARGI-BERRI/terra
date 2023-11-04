declare module NodeJS {
  interface ProcessEnv {
    readonly SWITCHBOT_TOKEN: string;
    readonly SWITCHBOT_SECRET: string;
  }
}
