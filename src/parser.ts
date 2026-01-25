import { Project } from "ts-morph";

const project = new Project({
    tsConfigFilePath: 'tsconfig.json'
});

export function findUndocumentedFunctions(filePath: string) {
    const sourceFile = project.addSourceFileAtPath(filePath);

    return sourceFile
        .getFunctions()
        .filter((fn: any) => {
            const docs = fn.getJsDocs();
            if (docs.length === 0) return true;

            const comment = docs[0].getComment();
            return !comment || comment.trim().length === 0;
        });
}