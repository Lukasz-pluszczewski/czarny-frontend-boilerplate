const fileSystem = require('./filesystem');

const actionsFactory = plop => ({
  modify: {
    addAtTheEnd: ({ path, text, addLineFeed = true }) => ({
      type: 'modify',
      path: path,
      template: `$1${addLineFeed ? '\n' : ''}${text}`,
      pattern: /(^[\s\S]*$)/,
    }),
    addAtTheBeginning: ({ path, text, addLineFeed = true }) => ({
      type: 'modify',
      path: path,
      template: `${text}${addLineFeed ? '\n' : ''}$1`,
      pattern: /(^[\s\S]*$)/,
    }),
    addAfter: ({ path, search, text, addLineFeed = true, customGroup = '1' }) => ({
      type: 'modify',
      path: path,
      template: `$${customGroup}${addLineFeed ? '\n' : ''}${text}`,
      pattern: new RegExp(search),
    }),
    addBetween: ({
      path,
      search,
      text,
      addLineFeedBefore = true,
      addLineFeedAfter = true,
      customGroupBeginning = '1',
      customGroupEnd = '2',
    }) => ({
      type: 'modify',
      path,
      template: `$${customGroupBeginning}${addLineFeedBefore ? '\n' : ''}${text}${addLineFeedAfter ? '\n' : ''}$${customGroupEnd}`,
      pattern: new RegExp(search),
    }),
    replace: ({ path, search, replace }) => ({
      type: 'modify',
      path,
      template: replace,
      pattern: search,
    }),
  },
  create: ({ path, template, context = {}, mergeAnswers = true }) => answers => {
    const mergedContext = Object.assign({}, (mergeAnswers ? answers : {}), context);
    fileSystem.createFile(plop.renderString(template, mergedContext), path);
  },
});

module.exports = actionsFactory;
