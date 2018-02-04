const packageJsonChangeSetting = name => new RegExp(`("${name}": ")[\\w ]*(")`);

const route = /({},\n)/g;

module.exports = {
  packageJsonChangeSetting,
  route,
};
