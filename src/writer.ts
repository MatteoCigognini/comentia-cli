import fs from "node:fs"
import path from "node:path"
import type { DocumentableFunction } from "./types.js";

export function backupFile(filePath: string, root: string) {
    const backupRoot = path.join(root, ".comentia-backup");
    const relative = path.relative(root, filePath);
    const backupPath = path.join(backupRoot, relative);

    fs.mkdirSync(path.dirname(backupPath), { recursive: true });

    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
    }
}

export function applyDoc(fn: DocumentableFunction & { addJsDoc: Function }, doc: string) {
    if (fn.getJsDocs?.().length) return;

    const cleaned = doc
        .replace(/^\/\*\*|\*\/$/g, "")
        .trim();

    fn.addJsDoc(cleaned);
}