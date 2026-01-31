import { scanFiles } from "./scanner.js";
import { findUndocumentedFunctions } from "./parser.js";
import { serializeFunction } from "./serializer.js";
import { buildPrompt } from "./prompt.js";
import { generateDoc } from "./llm.js";
import { applyDoc, backupFile } from "./writer.js";
import type { DocTone } from "./types.js";

export async function runPipeline(options: {
    targetPath: string;
    apply?: boolean;
    outDir?: string;
    tone: DocTone;
}) {
    const files = scanFiles(options.targetPath);

    let undocumentedCount = 0;

    for (const file of files) {
        const functions = findUndocumentedFunctions(file);
        undocumentedCount += functions.length;

        for (const fn of functions) {
            const data = serializeFunction(fn);
            const prompt = buildPrompt(data, options.tone);
            const doc = await generateDoc(prompt);

            console.log("📄", file);
            console.log(doc);
            console.log("-".repeat(40));

            if (options.apply) {
                backupFile(file, options.targetPath);
                // applyDoc(fn, doc);
                // await fn.getSourceFile().save();
            }
        }
    }

    return undocumentedCount;
}