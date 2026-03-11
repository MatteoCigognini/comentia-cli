# Comentia

**Comentia** is a CLI tool that automatically generates documentation for undocumented functions in a codebase.
It scans a repository, detects functions without documentation, analyzes their behavior and context, and generates clear documentation comments such as **JSDoc** or **PHP docstrings**.
The tool runs safely in analysis mode by default and only modifies files when explicitly instructed.

---
## ✨ Features
- 🔍 Scans a repository for undocumented functions
- 🧠 Attempts to understand function behavior and context
- 📝 Generates clear documentation (JSDoc / Docstrings)
- 🔒 Safe by default — no file changes without explicit confirmation
- 💾 Automatic backups before applying changes
- ⚙️ CLI-first workflow for easy integration in dev environments

---
## 🚧 Project Status

Comentia is currently **under active development**.
Some features may change and the API/CLI interface is not yet considered stable.

---
## 📦 Installation

Example:
```bash
npm install -g comentia
```
or run locally:
```bash
npx comentia
```

---
## 🚀 Usage

Run Comentia inside a project directory:
```bash
comentia [directory] [--options]
```
By default, Comentia will:
1. Scan the repository
2. Identify undocumented functions
3. Generate suggested documentation
4. Show the proposed changes

No files are modified in this mode.

---
## ✅ Apply Changes

To apply the generated documentation to the codebase:
```bash
comentia --apply
```

When --apply is used:
- files are backed up automatically
- documentation is written directly into the source files

---
## 🛡 Safety Mechanism

Before modifying any file, Comentia:
1. Creates a backup
2. Applies the generated documentation
3. Keeps the original version available for rollback

---
## 📄 Example

Before:
```javascript
function sum(a, b) {
  return a + b;
}
```
After:
```javascript
/**
 * Adds two numbers together.
 *
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of the two numbers
 */
function sum(a, b) {
  return a + b;
}
```

---
## 🎯 Goals

Comentia aims to:
- Reduce technical debt caused by missing documentation
- Help teams maintain consistent documentation
- Make legacy codebases easier to understand

---
## 🤝 Contributing

Contributions are welcome, but the project is currently in an early development phase.
Issues, feedback, and suggestions are appreciated.

---
## 📜 License

MIT License
