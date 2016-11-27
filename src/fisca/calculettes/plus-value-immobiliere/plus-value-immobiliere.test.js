var assert = require('chai').assert;
var lib = require('./plus-value-immobiliere');

describe('Fisca.Calculettes.PlusValueImmobiliere', function () {

    it('doit calculer l\'impot sur la plus value pour acquisition le 01/01/2000, cession 01/01/2016, prix achat 400k€, prix cession 750k€', () => {
        
        let calculette = new lib.PlusValueImmobiliereCalculette({
            dateCession: new Date(2016, 0, 1),
            dateAcquisition: new Date(2000, 0, 1),
            prixRevient: 400000,
            prixCession: 750000,
            travaux: 60000,
            fraisAcquisition: 30000           
        });

        assert.equal(calculette.pvBrute, 260000, 'Erreur dans la PV brute');
        assert.equal(calculette.abattementIr, 0.66, 'Erreur dans l\'abattementIr');
        assert.equal(calculette.irCession, 16796, 'Erreur dans le montant de l\'IR');
        assert.equal(calculette.psCession, 32986, 'Erreur dans le montant de PS');
        assert.equal(calculette.surtaxe, 5304, 'Erreur dans le montant de la surtaxe');
        assert.equal(calculette.totalImpots, 55086, 'Erreur dans le total impots');
        assert.equal(calculette.soldeNet, 694914, 'Erreur dans le solde net');

    });
    
});