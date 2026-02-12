import { detectLanguage, scanFiles, SUPPORTED_LANGUAGES } from "./scanner.js";
import { serializeFunction } from "./serializer.js";
import { buildPrompt } from "./prompt.js";
import { generateDoc } from "./llm.js";
import { applyDoc, backupFile } from "./writer.js";
import type { DocTone } from "./types.js";
import { parseLanguages } from "./helpers.js";
import { parseFile } from "./parsers/index.js";

export async function runPipeline(options: {
    targetPath: string;
    apply?: boolean;
    outDir?: string;
    tone: DocTone;
    languages: string;
}) {
    const languages = parseLanguages(options.languages);
    if (!languages.length) {
        throw new Error(
            `No valid languages provided. Supported: ${SUPPORTED_LANGUAGES.join(", ")}`
        );
    }

    const files = scanFiles(options.targetPath, languages);

    let undocumentedCount = 0;

    for (const file of files) {
        const language = detectLanguage(file); // es: ".ts" → "ts"
        const functions = parseFile(file, language);
        undocumentedCount += functions.length;

        for (const fn of functions) {
            const prompt = buildPrompt(fn, options.tone);
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