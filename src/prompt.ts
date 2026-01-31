export function buildPrompt(fn: {
    name: string;
    signature?: string;
    body?: string;
}) {
    return `
You are a senior software developer.

Write a concise JSDoc comment for the following function.
Rules:
- Do NOT change the code
- Do NOT explain obvious things
- Use @param and @returns when applicable
- Max 6 lines

Function:
${fn.signature}

Body:
${fn.body}

Return ONLY the JSDoc comment.
`.trim();
}