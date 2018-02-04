const plop = require('plop');
const _ = require('lodash');
const fileSystem = require('../utils/filesystem');
const routePattern = require('../utils/patterns').route;
const actionFactory = require('../utils/actionsFactory')(plop);
const addAfter = actionFactory.modify.addAfter;
const addAtTheBeginning = actionFactory.modify.addAtTheBeginning;

const routeGenerator = {
  description: 'Add a new Route',
  prompts: [
    {
      type: 'input',
      name: 'path',
      message: 'Path:',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'name is required';
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name:',
      validate: value => {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'name is required';
      },
    },
    {
      type: 'input',
      name: 'icon',
      message: 'Icon:',
    },
  ],
  actions({ name, path, icon }) {
    const componentName = `${_.upperFirst(_.camelCase(name))}Page`;
    const fileName = fileSystem.dirname('src', 'pages', `${componentName}.js`);

    const actions = [];

    // add page component action
    const addAction = {
      type: 'add',
      path: fileName,
      templateFile: fileSystem.templateDirname('component', 'page.hbs'),
    };

    if (fileSystem.fileExists(fileName)) {
      actions.push(() => 'Generating component canceled');
    } else {
      actions.push(addAction);
    }

    // add route to routes action
    actions.push(addAfter({
      path: fileSystem.dirname('src/constants', 'routes.js'),
      search: routePattern,
      text: `  {\n    path: '${path}',\n    component: ${componentName},\n    exact: true,\n    name: '${name}',\n    icon: '${icon}',\n  },\n`,
      addLineFeed: false,
      customGroup: '1',
    }));

    // add component import to routes
    actions.push(addAtTheBeginning({
      path: fileSystem.dirname('src/constants', 'routes.js'),
      text: `import ${componentName} from 'pages/${componentName}.js';`,
      addLineFeed: true,
    }));

    return actions;
  },
};

module.exports = routeGenerator;
