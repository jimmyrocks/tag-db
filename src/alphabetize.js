module.exports = function(arr) {
  arr.sort(function(a, b) {
    return a < b ? -1 : 1;
  });
  return arr;
};
