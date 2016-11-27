var assert = require('chai').assert;
var lib = require('./plus-value-immobiliere');

describe('Fisca.Calculette.PlusValueImmobiliere', function () {

    it('doit calculer l\'impot sur la plus value', function () {

        let calculette = new lib.PlusValueImmobiliereCalculette({
            dateCession: new Date(2016,0,1),
            dateAcquisition: new Date(2000,0,1),
            prixRevient: 40000,
            prixCession: 750000,
            travaux: 60000,
            fraisAcquisition: 30000
        });

        assert.equal(calculette.irCession, 16796);
        
    });

    
});