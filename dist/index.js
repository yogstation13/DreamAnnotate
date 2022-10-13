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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var core = __importStar(require("@actions/core"));
process.stdout.write("::warning file=README.md::This version of DreamAnnotate is deprecated, see https://github.com/yogstation13/DreamAnnotate/discussions/1 for more details." + os_1.default.EOL);
try {
    var data = fs_1.default.readFileSync(core.getInput("outputFile")).toString("utf8");
    core.info("DreamChecker Output: ");
    core.info(data);
    var regex = new RegExp(/(?<filename>.*?), line (?<line>\d+), column (?<column>\d+):\s{1,2}(?<type>error|warning): (?<message>.*)/, "g");
    var matches = Array.from(data.matchAll(regex), function (m) { return m.groups; });
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var match = matches_1[_i];
        process.stdout.write("::".concat(match.type, " file=").concat(match.filename, ",line=").concat(match.line, ",col=").concat(match.column, "::").concat(match.message).concat(os_1.default.EOL));
    }
}
catch (error) {
    //@ts-ignore
    core.setFailed(error.message);
}
