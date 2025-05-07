const fs = require('fs');
const recast = require('recast');
const glob = require('glob');
const babelParser = require('recast/parsers/babel');

function countConsolesInFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = recast.parse(code, { parser: babelParser });
    let count = 0;

    recast.types.visit(ast, {
        visitCallExpression(path) {
            const callee = path.node.callee;
            if (
                callee.type === 'MemberExpression' &&
                callee.object.name === 'console'
            ) {
                count++;
            }
            this.traverse(path);
        }
    });

    return count;
}

function countConsoles(globPattern) {
    const files = glob.sync(globPattern, { ignore: 'node_modules/**' });
    let total = 0;
    files.forEach(file => {
        const count = countConsolesInFile(file);
        if (count > 0) {
            console.log(`${file}: ${count}`);
            total += count;
        }
    });
    console.log(`Total console statements: ${total}`);
}

module.exports = countConsoles; 