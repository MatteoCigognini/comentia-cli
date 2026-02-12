import { Project, FunctionDeclaration } from "ts-morph";
import type { DocumentableFunction } from "./types.js";

const project = new Project({
    tsConfigFilePath: "tsconfig.json",
});

export function parseTypeScript(
    filePath: string
): DocumentableFunction[] {
    const sourceFile = project.addSourceFileAtPathIfExists(filePath);
    if (!sourceFile) return [];

    return sourceFile
        .getFunctions()
        .filter((fn: FunctionDeclaration) => {
            const docs = fn.getJsDocs();
            if (docs.length === 0) return true;

            const comment = docs[0].getComment();
            return !comment || `${comment}`.trim().length === 0;
        })
        .map((fn: FunctionDeclaration) => ({
            name: fn.getName() ?? "anonymous",
            params: fn.getParameters().map(p => p.getText()),
            returnType: fn.getReturnType().getText(),
            bodyText: fn.getBodyText() ?? "",
            language: "ts",
            node: fn,
            sourceFilePath: filePath,
        }));
}