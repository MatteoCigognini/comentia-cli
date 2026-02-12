import fs from "node:fs";
import path from "node:path";

export const SUPPORTED_LANGUAGES = ["ts", "js", "php"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

const LANGUAGE_EXTENSION: Record<SupportedLanguage, string[]> = {
    "ts": ['.ts'],
    "js": ['.js'],
    "php": ['.php'],
};

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
    languages: SupportedLanguage[] = ["ts", "js"]
): string[] {
    const extensions = languages.flatMap(l => LANGUAGE_EXTENSION[l])
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

export function detectLanguage(filePath: string): SupportedLanguage {
    const ext = path.extname(filePath);

    switch (ext) {
        case ".ts":
            return "ts";
        case ".js":
            return "js";
        case ".php":
            return "php";
        default:
            throw new Error(`Unsupported file type: ${ext}`);
    }
}
