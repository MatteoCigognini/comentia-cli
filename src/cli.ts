#!/usr/bin/env node

import "dotenv/config";
import { Command } from "commander";
import fs from "node:fs"
import path from "node:path"
import { scanFiles } from "./scanner.js";
import { findUndocumentedFunctions } from "./parser.js";
import { serializeFunction } from "./serializer.js";
import { buildPrompt } from "./llm/prompt.js";
import { generateDoc } from "./llm/gpt.js";

const program = new Command();

program
    .name("comentia")
    .description("Automatic and secure documentation for your code")
    .argument("<target>", "File or folder to scan")
    .option("--apply", "Write comments in the code")
    .parse();

const targetPath = program.args[0];
const options = program.opts();

if (!fs.existsSync(targetPath)) {
    console.error("❌ Invalid path:", targetPath);
    process.exit(1);
}

console.log("🔍 Analyzing...\n");

// Ricerca dei file analizzabili
const files = scanFiles(targetPath);
console.log(`✓ Found ${files.length} files`);

var undocumentedFunctionsCount: number = 0;
files.forEach(f => {
    // Ricerca funzioni senza documentazione
    const functions = findUndocumentedFunctions(f);
    undocumentedFunctionsCount += functions.length;

    // Iterazione delle funzioni senza documentazione
    functions.forEach(async fn => {
        const data = serializeFunction(fn);
        const prompt = buildPrompt(data);

        const doc = await generateDoc(prompt);

        console.log("📄", f);
        console.log(doc);
        console.log("-".repeat(40));
    });
})
console.log(`✓ Found ${undocumentedFunctionsCount} undocumented functions`);





console.log(
    options.apply
        ? "Modalità apply attiva (non fa ancora nulla)"
        : "0 file modificati (preview mode)"
);