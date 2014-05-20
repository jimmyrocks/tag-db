var writeTable = require('./src/writeTable');

writeTable.createTable(function(ce, cr) {
  writeTable.updateTable(function(e, r) {
    console.log(e);
    console.log(JSON.stringify(r, null,2));
  });
});
