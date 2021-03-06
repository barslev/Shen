

var Promise = require('bluebird');
var utils   = require('./utils.js');

var delay = function(genFunc, timeout) {
  return function *(next) {
    next = (utils.isGenerator(next)) ? next :
      (function *(nextCo) { yield nextCo; }).call(this);
    var timer = Promise.defer();
    setTimeout(function() {
      timer.resolve({});
    }, timeout);
    yield timer.promise;
    return yield genFunc.call(this, next);
  };
};

module.exports = delay;
