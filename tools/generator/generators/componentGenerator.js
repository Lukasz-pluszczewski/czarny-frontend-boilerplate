const _ = require('lodash');
const fileSystem = require('../utils/filesystem');
const removeAction = require('../actionsLibrary').removeAction;

const componentGenerator = {
  description: 'Generate new react component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Choose type of the component',
      choices: ['component', 'container', 'page', 'stateless'],
      default: 'component',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name of the component:',
      validate(value) {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'name is required';
      },
      filter(value) {
        return _.upperFirst(_.camelCase(value));
      },
    },
    {
      type: 'confirm',
      name: 'redux',
      message: 'Is component connected to redux state?',
    },
    {
      type: 'input',
      name: 'path',
      message: ({ type, name }) => `Path to the component relative to 'src' including fileName`,
      default: ({ type, name }) => `${type === 'stateless' ? 'component' : type}s/${name}.js`,
    },
    {
      type: 'confirm',
      name: 'overwrite',
      message: ({ path }) => `${path} file already exists. Overwrite?`,
      when: ({ path }) => {
        return fileSystem.fileExists('src', path);
      },
    },
  ],
  actions({ type, name, path, overwrite, props }) {
    const fileName = fileSystem.dirname('src', path);
    const actions = [];

    const addAction = {
      type: 'add',
      path: fileName,
      templateFile: fileSystem.templateDirname('component', `${type}.hbs`),
    };

    if (fileSystem.fileExists(fileName) && !overwrite) {
      actions.push(() => 'Generating component canceled');
    } else {
      if (overwrite) {
        // fileSystem.unlink(fileName);
        actions.push(removeAction(fileName));
      }
      actions.push(addAction);
    }

    return actions;
  },
};

module.exports = componentGenerator;
