'use strict';

var assert = require('assert')
  , equal = require('assert-dir-equal')
  , rho = require('../lib/index')
  , Metalsmith = require('metalsmith');

var LINKS = {
  gh: 'https://github.com/inca',
  metalsmith: 'http://metalsmith.io',
  rho: 'http://rhojs.org'
};

describe('metalsmith-rho', function() {
  it('should convert Rho files', function(done){
    Metalsmith('test/fixtures')
      .use(rho({
        resolveLink: function(id) {
          return LINKS[id];
        }
      }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/expected', 'test/fixtures/build');
        done();
      });
  });
});

