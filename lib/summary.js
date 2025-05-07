const fs = require('fs');
const recast = require('recast');
const glob = require('glob');
const babelParser = require('recast/parsers/babel');

function reportConsolesInFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = recast.parse(code, { parser: babelParser });
    const results = [];

    recast.types.visit(ast, {
        visitCallExpression(path) {
            const callee = path.node.callee;
            if (
                callee.type === 'MemberExpression' &&
                callee.object.name === 'console'
            ) {
                const { line } = path.node.loc.start;
                results.push({ file: filePath, line });
            }
            this.traverse(path);
        }
    });

    return results;
}

function summaryConsoles(globPattern) {
    const files = glob.sync(globPattern, { ignore: 'node_modules/**' });
    const summary = {}; // { [file]: { count: number, lines: [] } }
    let total = 0;

    files.forEach(file => {
        const results = reportConsolesInFile(file);
        if (results.length > 0) {
            summary[file] = {
                File: file,
                Count: results.length,
                Lines: results.map(r => r.line).join(', ')
            };
            total += results.length;
        }
    });

    if (Object.keys(summary).length > 0) {
        console.log('\nSummary Table:');
        console.table(Object.values(summary));
    } else {
        console.log('No console statements found.');
    }
    console.log(`Total console statements: ${total}`);
}

module.exports = summaryConsoles; 