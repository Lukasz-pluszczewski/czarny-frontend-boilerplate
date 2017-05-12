/* eslint-disable */
var exec = require('child_process').exec;

exec('node -v', function (err, stdout) {
  if (err) throw err;

  if (parseFloat(stdout.slice(1)) < 7) {
    throw new Error('This app requires node 7.0 or greater.');
  }
});
