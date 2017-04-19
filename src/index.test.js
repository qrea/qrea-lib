var assert = require('chai').assert;
var QreaLib = require('./index');

describe('QreaLib', function () {

    describe('#Compta', function () {

        it('doit instancier une comptablité', function () {
            const c = new QreaLib.Compta.Models.Comptabilite();
            assert.isDefined(c, 'Impossible d\'instancier une comptabilité');
        });

    });

    describe('#Facturation', function () {

        it('doit pouvoir créer une facture', function () {
            const c = new QreaLib.Facturation.Models.Facture();
            assert.isDefined(c, 'Impossible d\'instancier une facture');
        });

    });

});