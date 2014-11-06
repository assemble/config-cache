/*!
 * config-cache <https://github.com/jonschlinkert/config-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Config = require('..');
var config;


describe('config get/set', function () {
  beforeEach(function() {
    config = new Config();
  });

  describe('set()/get():', function () {
    it('should return immediate property value.', function() {
      config.set('a', 1);
      config.get('a').should.equal(1)
    });
    it('should return nested property value.', function() {
      config.set('b.c.d', 1);
      config.get('b.c.d').should.equal(1);
    });
    it('should set property value.', function() {
      config.set('b.c.d', 1);
      config.cache.b.c.d.should.equal(1);
    });
    it('literal backslash should escape period in property name.', function() {
      config.set('e\\.f\\.g', 1);
      config.get('e\\.f\\.g', true).should.equal(1);
      config.cache['e.f.g'].should.equal(1);
    });
  });

  describe('set() - add:', function () {
    it('should set a new property with the given value', function () {
      config.set('one', 1);
      config.get('one').should.equal(1);
    });
  });

  describe('set() - update:', function () {
    it('should update an existing property with the given value', function () {
      config.set('one', 2);
      config.get('one').should.equal(2);
    });

    it('should get the given property', function () {
      config.set('a', 'b');
      config.get('a').should.eql('b');
    });

    it('should set a value', function () {
      config.set('a', 'b');
      config.get('a').should.equal('b');
    });

    it('should set properties on the `cache` object.', function () {
      config.set('a', 'b');
      config.cache.a.should.equal('b');
    });

    it('should allow an object to be set directly.', function () {
      config.set({x: 'y'});
      config.cache.x.should.equal('y');
      config.get('x').should.equal('y');
    });

    it('should set nested properties on the `cache` object.', function () {
      config.set('c', {d: 'e'});
      config.get('c').d.should.equal('e');
    });

    it('should use dot notation to `set` values.', function () {
      config.set('h.i', 'j');
      config.get('h').should.eql({i: 'j'});
    });

    it('should use dot notation to `get` values.', function () {
      config.set('h', {i: 'j'});
      config.get('h.i').should.equal('j');
    });

    it('should return `this` for chaining', function () {
      config.set('a', 'b').should.equal(config);
      config
        .set('aa', 'bb')
        .set('bb', 'cc')
        .set('cc', 'dd');
      config.get('aa').should.equal('bb');
      config.get('bb').should.equal('cc');
      config.get('cc').should.equal('dd');
    });

    it('should expand template strings in the config.', function () {
      config
        .set('l', 'm')
        .set('j', {k: '${l}'}, true);
      config.cache.j.k.should.eql('m');
      config.get('j.k').should.eql('m');
    });

    it('should return undefined when not set', function () {
      config.set('a', undefined).should.equal(config);
    });
  });

  describe('.get()', function () {
    it('should return undefined when no set', function () {
      (config.get('a') == null).should.be.true;
    });

    it('should otherwise return the value', function () {
      config.set('a', 'b');
      config.get('a').should.equal('b');
    });
  });


  describe('.exists()', function () {
    it('should return `false` when not set', function () {
      config.exists('alsjls').should.be.false;
    });

    it('should return `true` when set.', function () {
      config.set('baba', 'zz');
      config.exists('baba').should.be.ok;
    });
  });
});