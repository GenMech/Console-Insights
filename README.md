![Console-Insights](https://socialify.git.ci/GenMech/Console-Insights/image?language=1&name=1&owner=1&pattern=Circuit+Board&theme=Light)

# console-insights

A powerful CLI tool to **gain insights, find, report, and remove `console.*` statements** from JavaScript, TypeScript, and JSX/TSX files.  
Perfect for keeping your codebase clean and gaining visibility into logging before production, during code reviews, or as part of your CI/CD pipeline.

---

## Features

- **Count** all `console.*` statements in your codebase.
- **Report** every `console.*` statement with file, line number, and code.
- **Summary Table**: See a per-file summary with counts and line numbers.
- **Remove** all or selected `console.*` statements, with:
  - `--dry-run` mode to preview changes.
  - `--methods` to target only specific console methods (e.g. `log`, `warn`).
  - `--lines` to target only specific line numbers.
- **Supports** modern JavaScript, TypeScript, JSX, and TSX syntax.
- **Glob pattern support** for flexible file selection.
- **Safe**: Ignores `node_modules` by default.

---

## Installation
```sh
npm install -g console-insights
```
Or use with `npx` (no install needed):

```sh
npx console-insights <command> [options]
```

## Usage

### Count console statements

Count in a specific file:
```sh
console-insights count src/App.jsx
```

Count only `console.log` and `console.warn` in a specific file:
```sh
console-insights count src/App.jsx --methods log,warn
```

Count in all JS/JSX/TS/TSX files recursively:
```sh
console-insights count "**/*.{js,jsx,ts,tsx}"
```

Count only `console.error` in all files:
```sh
console-insights count "**/*.{js,jsx,ts,tsx}" --methods error
```

### Report all console statements (file, line, code)

Report in a specific file:
```sh
console-insights report src/App.jsx
```

Report only `console.log` and `console.warn` in a specific file:
```sh
console-insights report src/App.jsx --methods log,warn
```

Report in all files:
```sh
console-insights report "**/*.{js,jsx,ts,tsx}"
```

Report only `console.error` in all files:
```sh
console-insights report "**/*.{js,jsx,ts,tsx}" --methods error
```

### Show a summary table

Summary for a specific file:
```sh
console-insights summary src/App.jsx
```

Summary for all files:
```sh
console-insights summary "**/*.{js,jsx,ts,tsx}"
```

### Remove console statements

Remove from a specific file:
```sh
console-insights remove src/App.jsx
```

Remove from all files:
```sh
console-insights remove "**/*.{js,jsx,ts,tsx}"
```

#### Dry run (preview what would be removed)

```sh
console-insights remove src/App.jsx --dry-run
```

#### Remove only specific methods

```sh
console-insights remove src/App.jsx --methods log,warn
```

#### Remove only on specific lines

```sh
console-insights remove src/App.jsx --lines 10,15
```

#### Combine options

```sh
console-insights remove src/App.jsx --methods log,warn --lines 10,15 --dry-run
```

## Example Usage Table

| Command Example                                                      | What it Does                                 |
|--------------------------------------------------------------------- |----------------------------------------------|
| `console-insights count src/App.jsx`                                  | Count all console statements in a file       |
| `console-insights count src/App.jsx --methods log,warn`              | Count only `console.log` and `console.warn` in a file |
| `console-insights report src/App.jsx`                                 | List all console statements in a file        |
| `console-insights report src/App.jsx --methods log,warn`             | List only `console.log` and `console.warn` in a file |
| `console-insights summary src/App.jsx`                                | Show summary for a single file               |
| `console-insights remove src/App.jsx`                                 | Remove all console statements from a file    |
| `console-insights count "**/*.js"`                                    | Count all console statements in JS files     |
| `console-insights count "**/*.js" --methods error`                   | Count only `console.error` in JS files       |
| `console-insights report "src/**/*.{js,jsx}"`                         | List all console statements in src/          |
| `console-insights report "src/**/*.{js,jsx}" --methods warn`         | List only `console.warn` in src/             |
| `console-insights summary "**/*.{js,jsx,ts,tsx}"`                     | Show summary table for all code files        |
| `console-insights remove "**/*.js" --dry-run`                         | Show what would be removed (no changes)      |
| `console-insights remove "**/*.js" --methods log,warn`                | Remove only `console.log` and `console.warn` |
| `console-insights remove "**/*.js" --lines 10,15`                     | Remove consoles only on lines 10 and 15      |
| `console-insights remove "**/*.js" --methods log --lines 10,15`       | Remove `console.log` only on lines 10, 15    |

## Options

| Option         | Description                                                      |
|----------------|------------------------------------------------------------------|
| `--dry-run`    | Show what would be removed, but do not modify files              |
| `--methods`    | Comma-separated list of console methods to count/report/remove (e.g. log,warn)|
| `--lines`      | Comma-separated list of line numbers to remove (e.g. 10,15)      |

## Why use console-insights?

- **Gain insights into your codebase's logging.**
- **Keep your codebase clean** before production.
- **Automate code review** for forgotten debug logs.
- **Integrate with CI/CD** to enforce no-console policies.
- **Flexible and safe**: preview changes, target only what you want.

## Typical Use Cases

- **Pre-deployment cleanup:** Remove all debug logs before production.
- **Code review:** Audit for forgotten `console.*` statements.
- **CI/CD integration:** Fail builds if any `console.*` statements remain.
- **Selective removal:** Remove only certain types or lines of console statements.

## License

MIT

## Contributing

Pull requests and issues are welcome! If you have ideas for new features or improvements, please open an issue or PR.

## Author

Gitesh Pareek  
https://www.linkedin.com/in/itsgitesh/


