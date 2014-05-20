var dir = require('node-dir');

module.exports = function(path, callback) {
  var jsonStore = {};
  dir.readFiles(path, function(err, content, filename, next) {
    var preset, key;
    if (filename.split('.').pop().toLowerCase() === 'json') {
      try {
        preset = JSON.parse(content);
        key = filename.split('/').slice(5).join('/').split('.').slice(0, 1);
        jsonStore[key] = preset;
      } catch (e) {
        console.log('can\'t parse ' + filename);
      }
    }
    next();
  }, function(err) {
    callback(err, jsonStore);
  });
};
