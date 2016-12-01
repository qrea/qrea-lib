var assert = require('chai').assert;
var lib = require('./plus-values');

describe('Fisca.Calculettes.ImpotRevenuCalculette.RevenusCategoriels.PlusValues', function () {

    it('doit calculer un plus value sur cession de titre de droit commun', () => {

        let ts = new lib.PlusValues;
        ts.regime = lib.regimeCessionValeurMobiliere.droitCommun;
        ts.dateAcquisition = new Date(2015,0,1);
        ts.dateCession = new Date(2016,0,1);
        ts.prixRevient = 100000;
        ts.revenuBrut = 150000;

        assert.equal(ts.plusValueBrute, 50000);
        assert.equal(ts.revenuNet, 50000);
        
    });

    it('doit calculer un plus value sur cession de titre départ en retraite', () => {

        let ts = new lib.PlusValues;
        ts.regime = lib.regimeCessionValeurMobiliere.departRetraite;
        ts.dateAcquisition = new Date(2015,0,1);
        ts.dateCession = new Date(2025,0,1);
        ts.prixRevient = 100000;
        ts.revenuBrut = 500000;

        assert.equal(ts.plusValueBrute, 400000);
        assert.equal(ts.revenuNet, 0);

        ts.revenuBrut = 1500000;
        assert.equal(ts.plusValueBrute, 1500000 - 100000);
        assert.equal(ts.revenuNet, Math.round((1 - 0.85) * (900000)));
        
    });

    it('doit calculer un plus value sur cession de titre régime incitatif', () => {

        let ts = new lib.PlusValues;
        ts.regime = lib.regimeCessionValeurMobiliere.incitatif;
        ts.dateAcquisition = new Date(2015,0,1);
        ts.dateCession = new Date(2025,0,1);
        ts.prixRevient = 100000;
        ts.revenuBrut = 500000;

        assert.equal(ts.plusValueBrute, 400000);
        assert.equal(ts.revenuNet, Math.round(400000 * (1 - 0.85)));
        
    });

});