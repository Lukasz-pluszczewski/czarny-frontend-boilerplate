const fileSystem = require('../utils/filesystem');
const packageJsonChangeSetting = require('../utils/patterns').packageJsonChangeSetting;
const removeAction = require('../actionsLibrary').removeAction;

const initGenerator = {
  description: 'Initialize application',
  prompts: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter name of the project',
      default: false,
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter the author of the project',
    },
    {
      type: 'list',
      name: 'licence',
      message: 'Choose licence',
      choices: [
        { name: 'MIT Licence (recommended)', value: 'MIT' },
        { name: 'GNU General Public License v3.0', value: 'GPL' },
        { name: 'Apache Licence 2.0', value: 'apache' },
      ],
    },
    {
      type: 'input',
      name: 'repo',
      message: 'Repo URL:',
      default: ({ projectName, author }) => `https://github.com/${author}/${projectName}`,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter description',
    },
  ],
  actions({ projectName, author, licence, repo, description }) {
    const createEditPackageJsonAction = (fieldName, value) => ({
      type: 'modify',
      path: 'package.json',
      template: `$1${value}$2`,
      pattern: packageJsonChangeSetting(fieldName),
    });

    const actions = [
      createEditPackageJsonAction('name', projectName),
      createEditPackageJsonAction('author', author),
      createEditPackageJsonAction('licence', licence),
      createEditPackageJsonAction('url', repo),
      createEditPackageJsonAction('description', description),
    ];

    if (fileSystem.fileExists('LICENSE')) {
      actions.push(removeAction(fileSystem.dirname('LICENSE')));
    }
    actions.push({
      type: 'add',
      path: 'LICENSE',
      templateFile: fileSystem.templateDirname('init/licences', licence + '.hbs'),
    });

    return actions;
  },
};

module.exports = initGenerator;
