const _ = require('lodash');
const filesystem = require('./tools/generator/utils/filesystem');

const upperFirst = string => string.charAt(0).toUpperCase() + string.substring(1);

module.exports = function(plop) {
  const modules = [
    {
      name: 'generator',
      callback: ({ name, path }) => {
        let required = require(path);
        if (_.isFunction(required)) {
          required = required(plop);
        }
        return plop.setGenerator(name, required)
      },
    },
    {
      name: 'helper',
      callback: ({ name, path }) => {
        let required = require(path);
        if (_.isFunction(required)) {
          required = required(plop);
        }
        return plop.addHelper(name, required);
      },
    },
    {
      name: 'prompt',
      callback: ({ name, path }) => {
        let required = require(path);
        if (_.isFunction(required)) {
          required = required(plop);
        }
        return plop.addPrompt(name, required);
      },
    },
  ];

  modules.forEach(module => {
    const fileNames = filesystem.readdir('tools/generator', module.name + 's');
    fileNames.forEach(fileName => {
      const suffix = upperFirst(module.name) + '.js';
      if (~fileName.indexOf(suffix)) {
        module.callback({ name: fileName.replace(suffix, ''), path: filesystem.dirname('tools/generator', module.name + 's', fileName) });
      }
    });
  });

  // add partial templates here with the name 'generatorName-partialName'
  plop.addPartial('test-header', filesystem.readFile('tools/generator/templates/test/headerPartial.hbs'));
  plop.addPartial('year', new Date().getFullYear().toString());
};
