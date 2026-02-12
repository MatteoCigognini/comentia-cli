import { parseTypeScript } from "./typescript.js";
import type { DocumentableFunction } from "./types.js";
import type { SupportedLanguage } from "../scanner.js";
import { parsePHP } from "./php.js";

export function parseFile(
    filePath: string,
    language: SupportedLanguage
): DocumentableFunction[] {
    switch (language) {
        case "ts":
        case "js":
            return parseTypeScript(filePath);

        case "php":
            return parsePHP(filePath);

        default:
            return [];
    }
}