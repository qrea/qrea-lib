var assert = require('chai').assert;
var lib = require('./traitements-salaires');

describe('Fisca.Calculettes.ImpotRevenuCalculette.TraitementsSalaires', function () {

    it('doit instancier un revenu catégoriel avec un traiement et salaire de 100k€ brut', () => {

        let ts = new lib.TraitementsSalaires();
        ts.revenuBrut = 100000;
        ts.typeRevenu = lib.typeTraitementSalaire.traitementSalaire;
        assert.equal(ts.revenuNet, 100000 * 0.9, 'Erreur pendant le calcul du revenu net du contribuable principal avec un traitement et salaire de 100k€');

        ts.revenuBrut = 1000;
        assert.equal(ts.revenuNet, 1000 - 426, 'Erreur pour l\'application de l\'abattement mini traitement et salaires');

        ts.revenuBrut = 1000000;
        assert.equal(ts.revenuNet, 1000000 - 12170, 'Erreur dans la plafond de l\'abattement des traitements et salaires');

        ts.revenuBrut = 20000;
        ts.fraisReel = 3500;
        assert.equal(ts.revenuNet, 20000 - 3500, 'Erreur dans l\'application des frais réels');
        
    });

    it('doit calculer une pension de retraite', () => {

        let pension = new lib.TraitementsSalaires();
        pension.typeRevenu = lib.typeTraitementSalaire.pension;
        pension.revenuBrut = 20000;
        assert.equal(pension.revenuNet, 20000 * 0.9);

    });

});