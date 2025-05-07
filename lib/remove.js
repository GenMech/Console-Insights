const fs = require('fs');
const recast = require('recast');
const glob = require('glob');
const babelParser = require('recast/parsers/babel');

function removeConsolesInFile(filePath, dryRun = false, methods = null, lines = null) {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = recast.parse(code, { parser: babelParser });
    const removed = [];

    recast.types.visit(ast, {
        visitExpressionStatement(path) {
            const expr = path.node.expression;
            if (
                expr &&
                expr.type === 'CallExpression' &&
                expr.callee.type === 'MemberExpression' &&
                expr.callee.object.name === 'console' &&
                (!methods || (expr.callee.property && methods.includes(expr.callee.property.name))) &&
                (!lines || (path.node.loc && lines.includes(path.node.loc.start.line)))
            ) {
                if (dryRun) {
                    const { line } = path.node.loc.start;
                    const statementCode = recast.print(path.node).code;
                    removed.push({ file: filePath, line, code: statementCode });
                }
                path.prune();
                return false;
            }
            this.traverse(path);
        }
    });

    if (dryRun) {
        removed.forEach(({ file, line, code }) => {
            console.log(`[dry-run] Would remove: ${file}:${line} - ${code}`);
        });
    } else {
        const output = recast.print(ast).code;
        fs.writeFileSync(filePath, output, 'utf8');
        if (removed.length > 0) {
            console.log(`Removed consoles from: ${filePath}`);
        }
    }
    return removed.length;
}

function removeConsoles(globPattern, dryRun = false, methods = null, lines = null) {
    const files = glob.sync(globPattern, { ignore: 'node_modules/**' });
    let total = 0;
    files.forEach(file => {
        total += removeConsolesInFile(file, dryRun, methods, lines);
    });
    if (dryRun) {
        console.log(`\n[dry-run] Total console statements that would be removed: ${total}`);
    }
}

module.exports = removeConsoles; 