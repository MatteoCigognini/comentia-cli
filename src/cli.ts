#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs"
import path from "node:path"
import { scanFiles } from "./scanner.js";

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

// Logica fake (per ora)
const files = scanFiles(targetPath);

console.log(`✓ Analisi completata`);
console.log(`✓ ${files.length} file trovati`);
console.log(
    options.apply
        ? "✍️ Modalità apply attiva (non fa ancora nulla)"
        : "⚠️ 0 file modificati (preview mode)"
);