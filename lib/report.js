const fs = require('fs');
const recast = require('recast');
const glob = require('glob');
const babelParser = require('recast/parsers/babel');

function reportConsolesInFile(filePath, methods = null) {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = recast.parse(code, { parser: babelParser });
    const results = [];

    recast.types.visit(ast, {
        visitCallExpression(path) {
            const callee = path.node.callee;
            if (
                callee.type === 'MemberExpression' &&
                callee.object.name === 'console' &&
                (!methods || (callee.property && methods.includes(callee.property.name)))
            ) {
                const { line } = path.node.loc.start;
                // Get the code for this node
                const statementCode = recast.print(path.parent.node).code;
                results.push({ file: filePath, line, code: statementCode });
            }
            this.traverse(path);
        }
    });

    return results;
}

function reportConsoles(globPattern, methods = null) {
    const files = glob.sync(globPattern, { ignore: 'node_modules/**' });
    let total = 0;
    files.forEach(file => {
        const results = reportConsolesInFile(file, methods);
        results.forEach(({ file, line, code }) => {
            console.log(`${file}:${line} - ${code}`);
            total++;
        });

    });
    console.log(`Total console statements: ${total}`);
}

module.exports = reportConsoles; 