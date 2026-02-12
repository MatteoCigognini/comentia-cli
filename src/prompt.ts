import type { DocTone } from "./types.js";
import type { DocumentableFunction } from "./parsers/types.js";

export function buildPrompt(fn: DocumentableFunction, tone: DocTone) {
    const toneInstruction = getToneInstruction(tone);

    const { codeLang, docStyle } = getLanguageConfig(fn.language);

    return `
You are a senior ${fn.language.toUpperCase()} developer.

${toneInstruction}

Generate a ${docStyle} comment for the following function.

Function name: ${fn.name}
Parameters: ${fn.params.length ? fn.params.join(", ") : "none"}
Return type: ${fn.returnType}
Function body:
\`\`\`${codeLang}
${fn.bodyText}
\`\`\`

Rules:
- Output ONLY the ${docStyle} comment
- Explain parameters in plain language
- Describe the return in plain language if tone is casual
- Avoid technical import paths in the return
- Include behavior and side effects (logging, file writes, async, etc.)

`.trim();
}

function getLanguageConfig(language: string) {
  switch (language) {
    case "ts":
    case "js":
      return { codeLang: "ts", docStyle: "JSDoc" };
    case "php":
      return { codeLang: "php", docStyle: "PHPDoc" };
    default:
      return { codeLang: language, docStyle: "Doc" };
  }
}

function getToneInstruction(tone: DocTone): string {
    switch (tone) {
        case "casual":
            return `
Use a friendly, clear and explanatory tone.
Explain what the function does in plain language.
Describe the return type in simple words, not TypeScript import paths.
Include side effects like logging or file operations.
`;
        case "technical":
        default:
            return `
Use a concise and technical tone.
Focus on behavior, parameters, return type, and side effects.
Use proper TypeScript types, including imported types if necessary.
Avoid storytelling or informal language.
`;
    }
}