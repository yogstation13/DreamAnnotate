/*
MIT License

Copyright (c) 2021 alexkar598

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
    core.setFailed(error.message)
}
