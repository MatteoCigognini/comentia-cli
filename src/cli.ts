#!/usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import { runPipeline } from "./pipeline.js";

const program = new Command();

program
    .argument("<target>")
    .option("--tone <type>", "Documentation tone: technical | casual", "technical")
    .option("--apply", "Write documentation to files")
    .option("--out <dir>", "Write output to directory")
    .parse();

const targetPath = program.args[0];
const options = program.opts();

const count = await runPipeline({
    targetPath,
    apply: options.apply,
    outDir: options.out,
    tone: options.tone,
});

console.log(`✓ Found ${count} undocumented functions`);