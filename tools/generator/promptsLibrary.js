const propTypes = {
  type: 'recursive',
  name: 'props',
  message: ({ name }) => `Would like to add property to ${name} component?`,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Prop name:',
      validate(value) {
        if ((/.+/).test(value)) {
          return true;
        }
        return 'prop name is required';
      },
    },
    {
      type: 'confirm',
      name: 'required',
      message: 'Is prop required?',
    },
    {
      type: 'list',
      name: 'PropType',
      message: 'Choose PropType',
      choices: [
        'array',
        'bool',
        'func',
        'number',
        'object',
        'string',
        'symbol',
        'node',
        'element',
        'other',
      ],
    },
  ],
};

module.exports = {
  propTypes,
};
