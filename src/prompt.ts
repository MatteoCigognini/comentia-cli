import type { DocTone } from "./types.js";

export function buildPrompt(fn: {
    name: string;
    params: string[];
    signature?: string;
    body?: string;
    returnType?: string;
    isAsync: boolean;
}, tone: DocTone) {
    const toneInstruction = getToneInstruction(tone);

    return `
You are a senior TypeScript developer.

${toneInstruction}

Generate a JSDoc comment for the following function.

Function name: ${fn.name}
Parameters: ${fn.params.length ? fn.params.join(", ") : "none"}
Return type: ${fn.returnType}
Function body:
\`\`\`ts
${fn.body}
\`\`\`

Rules:
- Output ONLY the JSDoc comment
- Explain parameters in plain language
- Describe the return in plain language if tone is casual
- Avoid technical import paths in the return
- Include behavior and side effects (logging, file writes, async, etc.)

`.trim();
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