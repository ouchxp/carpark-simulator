import fs from 'fs';
import util from 'util';
import yargs from 'yargs';
import executeCommands from './command';

const { argv } = yargs
  .alias('f', 'file')
  .nargs('f', 1)
  .describe('f', 'Load a file')
  .demandOption(['f'])
  .help('h')
  .alias('h', 'help');

const { file } = argv;

util
  .promisify(fs.readFile)(file, 'utf-8')
  .then(content => {
    const lines = content.split(/\r?\n/);
    const initialBus = { location: null };
    executeCommands(lines, initialBus);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Cannot read file', err);
  });
