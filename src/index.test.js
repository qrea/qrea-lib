var Lib = require('./index');
require('mocha');
var chai_1 = require('chai');
describe('Hello function', function () {
    it('should return hello world', function () {
        var result = new Lib.Core.Models.Adresse({});
        chai_1.expect(result).to.exist;
    });
});
