var assert = require('chai').assert;
var lib = require('./impot-revenu');

describe('Fisca.Calculettes.ImpotRevenuCalculette', function () {

    let calculette = new lib.ImpotRevenuCalculette({
        millesime: '2015'
    });


    // it('doit calculer l\'IR pour RNG=9k€ et PARTS=2', function () {
    //     const ir = calculette.calculerImpotBrut(9000, 2);
    //     assert.equal(ir, 0);
    // });

    // it('doit calculer l\'IR pour RNG=40k€ et PARTS=2', function () {
    //     const ir = calculette.calculerImpotBrut(40000, 2);
    //     assert.equal(ir, 2884);
    // });

    // it('doit calculer l\'IR pour RNG=370509€ et PARTS=4', function () {
    //     const ir = calculette.calculerImpotBrut(370509, 4);
    //     assert.equal(ir, 121430);
    // });

});