var assert = require('chai').assert;
var lib = require('./plus-value-immobiliere');

describe('Fisca.Calculettes.PlusValueImmobiliere', function () {

    it('doit calculer l\'impot sur la plus value pour acquisition le 01/01/2012, cession 27/11/2016, prix achat 200k€, prix cession 300k€', function () {

        let calculette = new lib.PlusValueImmobiliereCalculette({
            dateCession: new Date(2016, 11, 27),
            dateAcquisition: new Date(2012, 0, 1),
            prixRevient: 200000,
            prixCession: 300000            
        });

        assert.equal(calculette.irCession, 16150);
        
    });

    it('doit calculer l\'impot sur la plus value pour acquisition le 01/01/2012, cession 27/11/2016, prix achat 200k€, prix cession 310k€', () => {
        let calculette = new lib.PlusValueImmobiliereCalculette({
            dateCession: new Date(2016, 11, 27),
            dateAcquisition: new Date(2012, 0, 1),
            prixRevient: 200000,
            prixCession: 300000           
        });

        calculette.prixCession = 310000;
        assert.equal(calculette.prixCession, 310000);
        assert.equal(calculette.irCession, 16150 + 10000 * 19 / 100);
        
    });

    
});