const packageJsonChangeSetting = name => {
  return new RegExp(`("${name}": ")[\\w ]*(")`);
};

const route = /({},\n)/g;

module.exports = {
  packageJsonChangeSetting,
  route,
};
