var assert = require('chai').assert;
var QreaLib = require('./index');

describe('QreaLib', function () {

    describe('#Fisca', function () {
    
        it('doit instancier un calculette', function () {
            const res = new QreaLib.Fisca.Calculettes.PlusValueImmobiliereCalculette({
                dateCession: new Date(2016,0,23),
                dateAcquisition: new Date(2000, 3, 23),
                prixCession: 340000,
                prixRevient: 150000
            });
            assert.isDefined(res, 'Impossible d\'instancier la calculette PlusValueImmobiliereCalculette');
        });

    });
});
