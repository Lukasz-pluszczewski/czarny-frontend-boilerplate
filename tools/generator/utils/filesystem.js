const fs = require('fs');
const path = require('path');

const dirname = (...args) => {
  return path.resolve(__dirname, '../../../', ...args);
};

const templateDirname = (...args) => {
  return path.resolve(__dirname, '../templates', ...args);
};

const readdir = (...args) => {
  return fs.readdirSync(dirname(...args));
};

const readFile = (...file) => {
  return fs.readFileSync(dirname(...file), 'utf-8');
};

const fileExists = (...file) => {
  return fs.existsSync(dirname(...file));
};

const unlink = (...file) => {
  return fs.unlinkSync(dirname(...file));
};

const createFile = (data, ...file) => {
  return fs.writeFileSync(dirname(...file), data);
};

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
