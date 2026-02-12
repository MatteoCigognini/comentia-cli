import { parseTypeScript } from "./typescript.js";
import type { DocumentableFunction } from "./types.js";
import type { SupportedLanguage } from "../scanner.js";

export function parseFile(
    filePath: string,
    language: SupportedLanguage
): DocumentableFunction[] {
    switch (language) {
        case "ts":
        case "js":
            return parseTypeScript(filePath);

        case "php":
            // placeholder per ora
            return [];

        default:
            return [];
    }
}