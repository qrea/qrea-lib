var assert = require('chai').assert;
var lib = require('./traitements-salaires');

describe('Fisca.Calculettes.ImpotRevenuCalculette.TraitementsSalaires', function () {

    it('doit instancier un revenu catégoriel avec un traiement et salaire de 100k€ brut', () => {

        let ts = new lib.TraitementsSalaires();
        ts.traitementsSalairesPrincipal = 100000;
        assert.equal(ts.revenuNetPrincipal, 100000 * 0.9, 'Erreur pendant le calcul du revenu net du contribuable principal avec un traitement et salaire de 100k€');
        ts.traitementsSalairesPrincipal = 1000;
        assert.equal(ts.revenuNetPrincipal, 1000 - 426, 'Erreur pour l\'application de l\'abattement mini traitement et salaires');
        ts.traitementsSalairesConjoint = 1000000;
        assert.equal(ts.revenuNetConjoint, 1000000 - 12170, 'Erreur dans la plafond de l\'abattement des traitements et salaires');
        ts.traitementsSalairesAutres = 20000;
        ts.fraisReelAutres = 3500;
        assert.equal(ts.revenuNetAutres, 20000 - 3500, 'Erreur dans l\'application des frais réels');

    });

});