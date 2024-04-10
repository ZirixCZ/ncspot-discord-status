"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setActivity = exports.rpcClient = void 0;
const config_1 = require("./config");
const DiscordRPC = __importStar(require("discord-rpc"));
const rpcClient = new DiscordRPC.Client({ transport: "ipc" });
exports.rpcClient = rpcClient;
rpcClient.login({ clientId: config_1.config.clientId }).catch(console.error);
function setActivity(client, song) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!client) {
            return;
        }
        rpcClient.setActivity({
            state: (_a = config_1.config.activity) === null || _a === void 0 ? void 0 : _a.state,
            details: song,
            instance: false,
            largeImageKey: (_b = config_1.config.activity) === null || _b === void 0 ? void 0 : _b.largeImageKey,
            largeImageText: config_1.config.activity.largeImageText,
        });
    });
}
exports.setActivity = setActivity;
