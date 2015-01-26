  var getFiles = require('./readJsonFiles'),
    config = require('../config');

  var buildInsert = function(preset) {
    // TODO: Add the schema information to the config file
    var schema = {
        'pathname': 'text',
        'name': 'text',
        'geometry': 'text[]',
        'tags': 'json',
        'addTags': 'json',
        'removeTags': 'json',
        'fields': 'text[]',
        'icon': 'text',
        'maki': 'text',
        'terms': 'text[]',
        'searchable': 'boolean',
        'matchScore': 'numeric',
        'fcat': 'text',
        'displayed': 'boolean'
      },
      insertValues = JSON.parse(JSON.stringify(schema)),
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
          return JSON.stringify(parseFloat(d, 10));
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

    for (var idx in insertValues) {
      insertValues[idx] = null;
    }
    for (var column in preset) {
      // Validate and convert value here
      var validatedField = validateField(column, preset[column]);
      if (validatedField) {
        insertValues[column] = validatedField;
      }
    }
    return insertValues;
  };

  var getQueryList = function(callback) {
    getFiles(config.presetDir, function(e, r) {
      var queryList = [];
      if (e) {
        callback(e);
      } else {
        for (var preset in r) {
          r[preset].pathname = preset;
          queryList.push(buildInsert(r[preset]));
        }
        callback(e, queryList);
      }
    });
  };

  module.exports = {
    createTable: function(callback) {
      callback(null, config.sql.createTable);
    },
    updateTable: function(callback) {
      getQueryList(callback);
    }
  };
