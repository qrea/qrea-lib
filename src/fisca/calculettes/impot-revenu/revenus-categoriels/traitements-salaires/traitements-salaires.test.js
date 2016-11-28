var assert = require('chai').assert;
var lib = require('./traitements-salaires');

describe('Fisca.Calculettes.ImpotRevenuCalculette.TraitementsSalaires', function () {

    it('doit instancier un revenu catégoriel avec un traiement et salaire de 100k€ brut', () => {

        let ts = new lib.TraitementsSalaires();
        ts.traitementsSalairesPrincipal = 100000;
        assert.equal(ts.revenuNetPrincipal, 100000*0.9, 'Erreur pendant le calcul du revenu net du contribuable principal avec un traitement et salaire de 100k€');

    });

});