/// <reference path="../typings/index.d.ts" />
var QreaLib = require('../src/index');
describe('Facturation', function () {
    describe('#Models', function () {
        describe('#Adresse', function () {
            it("should instanciate Test", function () {
                var test = new QreaLib.Facturation.Models.Test();
            });
            it("should instanciate Adresse", function () {
                var a = new QreaLib.Facturation.Models.Adresse({});
            });
        });
    });
});
