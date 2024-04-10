"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logConfigError = exports.config = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const configFilePath = os_1.default.homedir() + "/.config/discordrpcshenanstest/config.json";
const loadConfigJSON = (path) => {
    if (!fs_1.default.existsSync(path)) {
        console.error(`Config file not found in ${path}`);
        process.exit(1);
    }
    return JSON.parse(fs_1.default.readFileSync(path, { encoding: "utf-8" }));
};
const config = loadConfigJSON(configFilePath);
exports.config = config;
const logConfigError = (argument) => {
    console.error(`Config error: ${argument} is required in ${configFilePath}. Current config: ${JSON.stringify(config)}`);
};
exports.logConfigError = logConfigError;
