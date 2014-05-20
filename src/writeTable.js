var database = require('./database'),
  getFiles = require('./readJsonFiles'),
  config = require('../config');

var buildInsert = function(preset) {
  // Will probably come out of config at some point, or even be used to create the table at some point
  // but not now
  var schema = {
    'pathname': 'text',
    'name': 'text',
    'geometry': 'text[]',
    'tags': 'json',
    'addtags': 'json',
    'removetags': 'json',
    'fields': 'text[]',
    'icon': 'text',
    'maki': 'text',
    'terms': 'text[]',
    'searchable': 'boolean',
    'matchscore': 'numeric',
    'fcat': 'text',
    'displayed': 'boolean'
  },
    insertStatement = {
      'insert': 'INSERT INTO tag_list ',
      'columns': [],
      'values': [],
      'params': []
    },
    validator = {
      'text': function(d) {
        return d.toString();
      },
      'text[]': function(d) {
        var out = [];
        d.map(function(v) {
          if (v && JSON.stringify(v).trim() !== '') {
            out.push(JSON.stringify(v));
          }
        });
        return '{' + out.join(',') + '}';
      },
      'json': function(d) {
        var out = [];
        for (var k in d) {
          out.push('"' + k + '":' + JSON.stringify(d[k]) + '');
        }
        return '{' + out.join(', ') + '}';
      },
      'numeric': function(d) {
        return JSON.stringify(parseInt(d, 10));
      },
      'boolean': function(d) {
        return d.toString();
      }
    },
    validateField = function(field, data) {
      var validatedField;
      if (schema[field] && validator[schema[field]]) {
        validatedField = validator[schema[field]](data);
      }
      return validatedField;
    };

  for (var column in preset) {
    // Validate and convert value here
    var validatedField = validateField(column, preset[column]);
    if (validatedField) {
      insertStatement.columns.push(column);
      insertStatement.params.push(validatedField);
      insertStatement.values.push('$' + insertStatement.params.length);
    }
  }

  return {
    'query': insertStatement.insert +
      ' (' + insertStatement.columns.join(',') +
      ') VALUES (' + insertStatement.values.join(',') + ');',
    'params': insertStatement.params
  };
};

module.exports = {
  createTable: function(callback) {
    database.runScript(config.sql.createTable, callback);
  },
  updateTable: function(callback) {
    getFiles(config.presetDir, function(e, r) {
      var queryList = [];
      if (e) {
        callback(e);
      } else {
        for (var preset in r) {
          r[preset].pathname = preset;
          queryList.push(buildInsert(r[preset]));
        }
        database.runQueryListAsync(queryList, function(de, dr) {
          callback(de, dr);
        });
      }
    });
  }
};
