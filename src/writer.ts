import fs from "node:fs"
import path from "node:path"
import type { DocumentableFunction } from "./types.js";

export function backupFile(filePath: string, projectRoot: string) {
    const absRoot = path.resolve(projectRoot);
    const absFile = path.resolve(filePath);

    const backupRoot = path.join(absRoot, ".comentia-backup");
    const relative = path.relative(absRoot, absFile);
    const backupPath = path.join(backupRoot, relative);

    fs.mkdirSync(path.dirname(backupPath), { recursive: true });

    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(absFile, backupPath);
    }

    console.log("🛡 Backup created at:", backupPath);
}

export function applyDoc(fn: DocumentableFunction & { addJsDoc: Function }, doc: string) {
    if (fn.getJsDocs?.().length) return;

    const cleaned = doc
        .replace(/^\/\*\*|\*\/$/g, "")
        .trim();

    fn.addJsDoc(cleaned);
}