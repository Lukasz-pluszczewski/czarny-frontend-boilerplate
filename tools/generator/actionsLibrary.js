const fileSystem = require('./utils/filesystem');

const removeAction = (file, message = 'File removed') => () => {
  fileSystem.unlink(file);
  return message;
};

module.exports = {
  removeAction,
};
