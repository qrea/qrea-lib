var assert = require('chai').assert;
var lib = require('./impot-revenu');
var RevenusCategoriels = require('./revenus-categoriels/revenus-categoriels');

describe('Fisca.Calculettes.ImpotRevenuCalculette', function () {

    let calculette = new lib.ImpotRevenuCalculette({
        couple: false,
        revenuNetGlobal: 0,
        nbEnfants: 0,
        millesime: '2015'
    });

    it('doit calculer un impôt à 0', function () {        
        assert.equal(calculette.impotBrut, 0, 'Erreur dans le calcul de l\'impot avec un revenu = 0');
    });

    it('doit calculer l\'IR pour RNG=9k€ et PARTS=2', function () {
        calculette.couple = true;
        calculette.revenuNetGlobal = 9000;
        assert.equal(calculette.impotBrut, 0);
    });

    it('doit calculer l\'IR pour RNG=15k€ en appliquant la décote', function () {
        calculette.couple = false;
        calculette.revenuNetGlobal = 15000;
        assert.equal(calculette.impotBrut, 133);
    });

    it('doit calculer l\'IR pour RNG=40k€ et PARTS=2', function () {
        calculette.couple = true;
        calculette.revenuNetGlobal = 40000;
        assert.equal(calculette.impotBrut, 2884);
    });

    it('doit calculer l\'IR pour RNG=370509€ et PARTS=4 en appliquant le plafonnement du quotient', function () {
        calculette.couple = true;
        calculette.nbEnfants = 3;
        calculette.revenuNetGlobal = 370509;
        assert.equal(calculette.impotBrut, 121430);
    });

    it('doit ajouter un revenu categoriel et verifier la maj', () => {

        let c = new lib.ImpotRevenuCalculette({
            couple: false,
            revenuNetGlobal: 0,
            nbEnfants: 0,
            millesime: '2015'
        });

        c.ajouterRevenu(new RevenusCategoriels.TraitementsSalaires());
        assert.equal(c.impotBrut, 0, 'Impot brut != 0');

        c.revenus[0].revenuNet = 15000;
        assert.equal(c.impotBrut, 133, 'Erreur après la maj du revenu net');

        c.revenus[0].pensionsRetraiteAutres = 0;
        assert.equal(c.impotBrut, 0, 'Impot brut != 0');
        assert.isDefined(c.impotBrut, 'Impot brut undefined');

        c.revenus[0].pensionsRetraiteAutres = 15000 / 0.9;
        assert.equal(c.impotBrut, 133, 'Impot brut != 133');        

    });


});