/* global describe, it, before, after */
'use strict'

var chai = require('chai')
var wrapper = require('../')
var binCheck = require('bin-check')
var lint = wrapper.lint
var cli = wrapper.cli

var goodFilePath = __dirname + '/good.php'
var badFilePath = __dirname + '/bad.php'

chai.should()

describe('PHP-lint', function () {
  after(function (done) {
    wrapper.clearCache(done)
  })

  describe('using Node', function () {
    it('should NOT throw an error if file has correct PHP', function (done) {
      lint([goodFilePath], function (err, stdout, stderr) {
        done(err || stderr)
      })
    })

    it('should throw an error if file has incorrect PHP', function (done) {
      lint([badFilePath], function (err, stdout, stderr) {
        (err !== undefined).should.be.true

        done()
      })
    })
  })

  describe('cli', function () {
    var initialArgs = process.argv

    before(function (done) {
      process.argv = ['phplint']

      done()
    })

    after(function (done) {
      process.argv = initialArgs

      done()
    })

    it('should be exectuable', function (done) {
      binCheck(__dirname + '/../cli.js').then(function (works) {
        console.log('bin-check', works)
        works.should.equal(true)
        done()
      })
    })

    it('should throw an error on bad php files', function (done) {
      cli([badFilePath], {}, function (err) {
        (err !== undefined).should.be.true

        done()
      })
    })

    it('should not throw an error on good php files', function (done) {
      cli([goodFilePath], {}, function () {
        done()
      })
    })
  })
})
