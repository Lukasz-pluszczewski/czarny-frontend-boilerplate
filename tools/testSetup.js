process.env.NODE_ENV = 'test';

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
['.css', '.scss', '.png', '.jpg'].forEach(ext => {
  require.extensions[ext] = () => null;
});

// Register babel so that it will transpile ES6 to ES5
// before our tests run.
require('babel-register')();
require('babel-polyfill');

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

chai.use(sinonChai);
chai.use(chaiAsPromised);

Enzyme.configure({ adapter: new Adapter() });
