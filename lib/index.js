'use strict';

var Rho = require('rho').BlockCompiler
  , path = require('path')
  , debug = require('debug')('metalsmith:rho');

module.exports = exports = function(options) {

  options = options || {};

  var compiler = new Rho(options);

  return function(files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function(file) {
      if (!isRhoFile(file))
        return;
      var dir = path.dirname(file)
        , data = files[file]
        , basename = path.basename(file, path.extname(file))
        , target = path.join(dir, basename + '.html');
      debug('processing file: %s', file);
      var html = compiler.toHtml(data.contents.toString());
      data.contents = new Buffer(html);
      delete files[file];
      files[target] = data;
    });
  }

};

function isRhoFile(file) {
  return '.rho' == path.extname(file);
}
