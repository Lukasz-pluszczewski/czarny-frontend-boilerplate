const fs = require('fs');
const path = require('path');

const dirname = (...args) => path.resolve(__dirname, '../../../', ...args);

const templateDirname = (...args) => path.resolve(__dirname, '../templates', ...args);

const readdir = (...args) => fs.readdirSync(dirname(...args));

const readFile = (...file) => fs.readFileSync(dirname(...file), 'utf-8');

const fileExists = (...file) => fs.existsSync(dirname(...file));

const unlink = (...file) => fs.unlinkSync(dirname(...file));

const createFile = (data, ...file) => fs.writeFileSync(dirname(...file), data);

module.exports = {
  dirname,
  templateDirname,
  readdir,
  readFile,
  fileExists,
  unlink,
  createFile,
  generatorDir: dirname('tools/generator'),
};
