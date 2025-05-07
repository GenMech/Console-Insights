#!/usr/bin/env node

const { program } = require('commander');
const countConsoles = require('../lib/count');
const removeConsoles = require('../lib/remove');
const reportConsoles = require('../lib/report');
const summaryConsoles = require('../lib/summary');

program
    .command('count [pattern]')
    .description('Count console statements in files')
    .action((pattern = '**/*.js') => {
        countConsoles(pattern);
    });

program
    .command('remove [patterns...]')
    .description('Remove console statements from files')
    .option('--dry-run', 'Show what would be removed without changing files')
    .option('--methods <methods>', 'Comma-separated list of console methods to remove (e.g. log,warn)')
    .option('--lines <lines>', 'Comma-separated list of line numbers to remove (e.g. 10,15)')
    .action((patterns = ['**/*.js'], options) => {
        const pattern = patterns.length === 1 ? patterns[0] : `{${patterns.join(',')}}`;
        const methods = options.methods ? options.methods.split(',').map(m => m.trim()) : null;
        const lines = options.lines ? options.lines.split(',').map(l => parseInt(l.trim(), 10)) : null;
        removeConsoles(pattern, options.dryRun, methods, lines);
    });

program
    .command('report [patterns...]')
    .description('Report all console statements with file and line number')
    .action((patterns = ['**/*.js']) => {
        const pattern = patterns.length === 1 ? patterns[0] : `{${patterns.join(',')}}`;
        reportConsoles(pattern);
    });

program
    .command('summary [patterns...]')
    .description('Show a summary table of console statements per file')
    .action((patterns = ['**/*.js']) => {
        const pattern = patterns.length === 1 ? patterns[0] : `{${patterns.join(',')}}`;
        summaryConsoles(pattern);
    });

program.parse(process.argv); 