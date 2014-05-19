var config = require('./config'),
  dir = require('node-dir'),
  getFiles = function(callback) {
    var jsonStore = {};
    dir.readFiles(config.presetDir, function(err, content, filename, next) {
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

var alphabetizeObject = function(obj) {
  var newObj = {},
    keyArray = [];
  // In theory, this is useless since you can't order an object
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keyArray.push(key);
    }
  }
  keyArray.sort(function(a, b) {
    return a < b ? -1 : 1;
  });
  for (var i = 0; i < keyArray.length; i++) {
    newObj[keyArray[i]] = obj[keyArray[i]];
  }
  return newObj;
};

getFiles(function(e, r) {
  //console.log(JSON.stringify(alphabetizeObject(r), null, 4));
  var columns = {};
  for (var preset in r) {
    for (var column in r[preset]) {
      //columns[column] = columns[column] ? columns[column] + 1 : 1;
      columns[column] = r[preset][column];
    }
  }
  console.log(columns);
});
