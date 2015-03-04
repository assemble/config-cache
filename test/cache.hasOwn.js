/*!
 * config-cache <https://github.com/jonschlinkert/config-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var Config = require('..');
var config;


describe('config hasOwnProperty', function () {
  beforeEach(function() {
    config = new Config();
  });

  describe('.hasOwn()', function () {
    it('should return `true` if the property is on the cache.', function () {
      config.set('a', 'b');
      config.get('a').should.equal('b');

      config.hasOwn('a').should.be.true;
      config.hasOwn('a', {}).should.be.false;
    });

    it('should return `true` if the property is on the given object.', function () {
      config.set('a', 'b');
      config.hasOwn('a').should.be.true;
      config.hasOwn('a', {}).should.be.false;
    });

    it('should return `false` when the property does not exist on the cache.', function () {
      config.set('a', 'b');
      config.hasOwn('b').should.be.false;
    });

    it('should return `false` when the property does not exist on the given object.', function () {
      config.set('a', 'b');
      config.hasOwn('a').should.be.true;
      config.hasOwn('a', {}).should.be.false;
    });
  });
});