var assert = require('chai').assert;
var lib = require('./revenus-fonciers');

describe('Fisca.Calculettes.ImpotRevenuCalculette.RevenusCategoriels.RevenusFonciers', function () {

    it('doit instancier un revenus fonciers', () => {

        let ts = new lib.RevenusFonciers();

        ts.regime = lib.regimesFonciers.micro;
        ts.revenuBrut = 12000;
        assert.equal(ts.abattement, 12000 * 0.3, 'Erreur dans le calcul de l`\'abattement micro foncier');
        assert.equal(ts.revenuNet, 12000 * 0.7, 'Erreur dans le calcul du revenu net micro');

        ts.regime = lib.regimesFonciers.reel;
        ts.interetsEmprunt = 2000;
        ts.chargesDeductibles = 2000;
        assert.equal(ts.revenuNet, 12000 - 2000 - 2000, 'Erreur dans la calcul du revenu net en regime réel');

        ts.interetsEmprunt = 15000;
        assert.equal(ts.interetsEmpruntReportable, 3000, 'Erreur dans la calcul des intérets reportables');
        assert.equal(ts.revenuNet, -2000, 'Erreur dans le calcul du déficit foncier');

        ts.travaux = 10000;
        assert.equal(ts.revenuNet, -10700, 'Erreur dans le calcul du déficit plafonné');
        assert.equal(ts.deficitReportable, 10000 + 2000 - 10700, 'Erreur dans le montant du déficit reportable');
        
    });

});