var datagres = require('datagres')(require('./config'));
var writeTable = require('./src/writeTable')(datagres);

// TODO: Take a parameter to either write to the DB or to read from the DB
// TODO: Create code to read from the DB into files
// TODO: Report Progress

writeTable.createTable(function(e) {
  if (e) {
    throw (e.stack ? e : new Error(e));
  } else {
    writeTable.updateTable(function(writeE) {
      if (writeE) throw (writeE.stack ? writeE : new Error(writeE));
      process.exit(0);
    });
  }
});
