import { config } from "./config";
import * as DiscordRPC from "discord-rpc";

import type { Socket } from "net";

const rpcClient = new DiscordRPC.Client({ transport: "ipc" });

rpcClient.login({ clientId: config.clientId }).catch(console.error);

async function setActivity(client: Socket, song: string) {
  if (!client) {
    return;
  }

  rpcClient.setActivity({
    state: config.activity?.state,
    details: song,
    instance: false,
    largeImageKey: config.activity?.largeImageKey,
    largeImageText: config.activity.largeImageText,
  });
}

export { rpcClient, setActivity };
