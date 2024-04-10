import fs from "fs";
import os from "os";

interface Config {
  port: number;
  host: string;
  clientId: string;
  loadText?: string;
  preTrackText?: string;
  activity: {
    state?: string;
    largeImageKey?: string;
    largeImageText?: string;
  };
}

const configFilePath =
  os.homedir() + "/.config/ncspot-discord-status/config.json";

const loadConfigJSON = (path: string) => {
  if (!fs.existsSync(path)) {
    console.error(`Config file not found in ${path}`);
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
};

const config: Config = loadConfigJSON(configFilePath);

const logConfigError = (argument: string) => {
  console.error(
    `Config error: ${argument} is required in ${configFilePath}. Current config: ${JSON.stringify(
      config,
    )}`,
  );
};

export { config, logConfigError };
