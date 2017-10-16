var chai = require('chai');
var is = require('../src/is');
var expect = chai.expect;

describe('is', function () {
  'use strict';

  it('should add a new method to the API', function () {
    is.extend({
      array: Array.isArray
    });

    expect(Object.prototype.hasOwnProperty.call(is, 'array')).to.be.true;
  });

  it('should throw when trying to add a reserved method', function () {
    expect(function () {
      return is.extend({
        any: function () {
          return true;
        }
      });
    }).to.throw();
  });

  it('should throw an error if trying to extend the API with anything than a function', function () {
    expect(function () {
      return is.extend({
        func: {foo: 'bar'}
      });
    }).to.throw();
  });

  it('should return true if value is array', function () {
    expect(is.array([1, 2, 3])).to.be.true;
  });

  it('should return false if value is not array', function () {
    expect(is.array({foo: 'bar'})).to.be.false;
  });

  it('should return true if value is not array', function () {
    expect(is.not.array({foo: 'bar'})).to.be.true;
  });

  it('should return true if any value is array', function () {
    expect(is.any.array([1, 2, 3], 10)).to.be.true;
  });

  it('should return false if any value is array', function () {
    expect(is.any.array({foo: 'bar'}, 10)).to.be.false;
  });

  it('should return true if all values are arrays', function () {
    expect(is.all.array([1, 2, 3], ['a', 'b', 'c'], [{foo: 'bar'}])).to.be.true;
  });

  it('should return false if none of the values is array', function () {
    expect(is.all.array(10, {foo: 'bar'}, 'Hello')).to.be.false;
  });
});
