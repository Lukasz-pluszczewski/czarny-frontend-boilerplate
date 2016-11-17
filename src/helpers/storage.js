export default {
  save: (name, data) => localStorage.setItem(name, data),
  load: name => localStorage.getItem(name),
  remove: name => localStorage.removeItem(name),
};
