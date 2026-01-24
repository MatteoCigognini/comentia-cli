import fs from "node:fs";
import path from "node:path";

const DEFAULT_IGNORE = new Set([
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage"
]);

export function scanFiles(
    targetPath: string,
    extensions: string[] = [".ts", ".js"]
): string[] {
    const result: string[] = [];

    function walk(current: string) {
        const stat = fs.statSync(current);

        if (stat.isFile()) {
            if (extensions.includes(path.extname(current))) {
                result.push(current);
            }
            return;
        }

        const dirName = path.basename(current);
        if (DEFAULT_IGNORE.has(dirName)) return;

        for (const entry of fs.readdirSync(current)) {
            walk(path.join(current, entry));
        }
    }

    walk(targetPath);

    return result;
}