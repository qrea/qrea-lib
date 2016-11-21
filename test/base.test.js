/// <reference path="../typings/index.d.ts" />
var index_1 = require('../src/index');
describe('Facturation', function () {
    describe('#Models', function () {
        describe('#Adresse', function () {
            it("should instanciate Adresse", function () {
                var a = new index_1.Facturation.Models.Adresse({
                    ligne1: 'test'
                });
            });
        });
    });
});
