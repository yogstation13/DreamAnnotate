import fs from "fs";
import os from "os";
import * as core from "@actions/core"

export interface Match {
    filename: string,
    line: string,
    column: string,
    type: "error" | "warning",
    message: string
}

process.stdout.write("::warning file=README.md::This version of DreamAnnotate is deprecated, see https://github.com/yogstation13/DreamAnnotate/discussions/1 for more details." + os.EOL)

try {
    const data = fs.readFileSync(core.getInput("outputFile")).toString("utf8");
    core.info("DreamChecker Output: ");
    core.info(data);
    const regex = new RegExp(/(?<filename>.*?), line (?<line>\d+), column (?<column>\d+):\s{1,2}(?<type>error|warning): (?<message>.*)/, "g")

    const matches = Array.from(data.matchAll(regex), m => m.groups) as unknown as Match[];
    for(const match of matches) {
        process.stdout.write(`::${match.type} file=${match.filename},line=${match.line},col=${match.column}::${match.message}${os.EOL}`)
    }
} catch (error) {
    //@ts-ignore
    core.setFailed(error.message)
}