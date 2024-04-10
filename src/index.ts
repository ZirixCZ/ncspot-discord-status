import { client } from "./net";
import { rpcClient, setActivity } from "./rpc";
import { config, logConfigError } from "./config";

interface Track {
  type: string;
  id: string;
  uri: string;
  title: string;
  track_number: number;
  disc_number: number;
  duration: number;
  artists: string[];
  artist_ids: string[];
  album: string;
  album_id: string;
  album_artists: string[];
  cover_url: string;
  url: string;
  added_at: null;
  list_index: number;
  is_local: boolean;
  is_playable: true;
}

interface Ncspot {
  mode: string;
  playable: Track;
}

const port = config.port || 8888;
const host = config.host || "localhost";

const clientId = config.clientId;

if (!clientId) {
  logConfigError("clientId");
  process.exit(1);
}

rpcClient.on("ready", () => {
  setActivity(client, config.loadText ?? "");
});

client.connect(port, host, () => {
  console.log(`Connected to ncspot via TCP on port ${port}`);
});

client.on("data", (data) => {
  let jsonData: Ncspot;
  try {
    const jsonString = data.toString();
    jsonData = JSON.parse(jsonString);
  } catch (e) {
    console.error("Ran into error while parsing: \n", e);
    return;
  }
  setActivity(client, config.preTrackText + jsonData?.playable.title);
});

client.on("close", () => {
  console.log("Connection closed");
});

client.on("error", (err) => {
  console.error("Connection error: " + err.message);
});
