var config = require('./config');
var datawrap = require('datawrap')(config.database, config.defaults);
var writeTable = require('./src/writeTable');

// TODO: Take a parameter to either write to the DB or to read from the DB
// TODO: Create code to read from the DB into files
// TODO: Report Progress

writeTable.createTable(function(e, r) {
  if (e) {
    throw (e.stack ? e : new Error(e));
  } else {
    console.log(r);
    writeTable.updateTable(function(writeE, writeR) {
      if (writeE) {
        throw (writeE.stack ? writeE : new Error(writeE));
      } else {
        datawrap.runQuery(config.sql.insertValue, writeR, {
          paramList: true
        }, function(dE) {
          if (dE) throw (dE.stack ? dE : new Error(dE));
          process.exit(0);
        });
      }
    });
  }
});
