"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("./net");
const rpc_1 = require("./rpc");
const config_1 = require("./config");
const port = config_1.config.port || 8888;
const host = config_1.config.host || "localhost";
const clientId = config_1.config.clientId;
if (!clientId) {
    (0, config_1.logConfigError)("clientId");
    process.exit(1);
}
rpc_1.rpcClient.on("ready", () => {
    var _a;
    (0, rpc_1.setActivity)(net_1.client, (_a = config_1.config.loadText) !== null && _a !== void 0 ? _a : "");
});
net_1.client.connect(port, host, () => {
    console.log(`Connected to ncspot via TCP on port ${port}`);
});
net_1.client.on("data", (data) => {
    let jsonData;
    try {
        const jsonString = data.toString();
        jsonData = JSON.parse(jsonString);
    }
    catch (e) {
        console.error("Ran into error while parsing: \n", e);
        return;
    }
    (0, rpc_1.setActivity)(net_1.client, config_1.config.preTrackText + (jsonData === null || jsonData === void 0 ? void 0 : jsonData.playable.title));
});
net_1.client.on("close", () => {
    console.log("Connection closed");
});
net_1.client.on("error", (err) => {
    console.error("Connection error: " + err.message);
});
