import phpParser from "php-parser";
import type { DocumentableFunction } from "./types.js";
import fs from "node:fs";
import path from "node:path"

const { Engine } = phpParser;

const parserEngine = new Engine({
    parser: {
        extractDoc: true,
        php7: true
    },
    ast: {
        withPositions: true
    }
});

export function parsePHP(
    filePath: string
): DocumentableFunction[] {
    const code = fs.readFileSync(filePath, "utf-8"); // Usando UTF-8 rende stringa il buffer
    const ast = parserEngine.parseCode(code, path.basename(filePath));

    const functions: DocumentableFunction[] = [];

    // Funzione ricorsiva per camminare l'AST
    function walk(node: any) {
        if (node.kind === "function") {
            const funcNode = node as any;
            functions.push({
                name: funcNode.name?.name ?? "anonymous",
                params: funcNode.arguments.map((a: any) => `${a.name}`), // param name
                returnType: funcNode.type?.name ?? "unknown",
                bodyText: code.slice(funcNode.loc?.start.offset ?? 0, funcNode.loc?.end.offset ?? 0),
                language: "php",
                node: funcNode,
                sourceFilePath: filePath,
            });
        }

        for (const key in node) {
            const value = (node as any)[key];
            if (Array.isArray(value)) {
                value.forEach(v => v && typeof v === "object" && "kind" in v && walk(v));
            } else if (value && typeof value === "object" && "kind" in value) {
                walk(value);
            }
        }
    }

    walk(ast);

    return functions;
}