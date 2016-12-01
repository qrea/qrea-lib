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

        let revenu1 = new RevenusCategoriels.TraitementsSalaires({
            typeRevenu: RevenusCategoriels.typeTraitementSalaire.traitementSalaire,
            revenuBrut: 20000
        });

        c.ajouterRevenu(revenu1);

        assert.equal(revenu1.revenuNet, 20000 * 0.9, 'Erreur dans le calcul du net');

        assert.equal(c.impotBrut, 868, 'Erreur après la maj du revenu net');
        revenu1.revenuBrut = 0;
        assert.equal(c.impotBrut, 0, 'Impot brut != 0');
        revenu1.revenuBrut = 15000 / 0.9;
        revenu1.typeRevenu = RevenusCategoriels.typeTraitementSalaire.pension;
        assert.equal(c.impotBrut, 133, 'Impot brut != 133');

        let revenu2 = new RevenusCategoriels.TraitementsSalaires({
            typeRevenu: RevenusCategoriels.typeTraitementSalaire.pension,
            revenuBrut: 4000
        });

        assert.equal(revenu2.revenuNet, 4000 * 0.9, 'Erreur dans le calcul du net de la pension');
        c.ajouterRevenu(revenu2);

        revenu1.revenuBrut = 6666.667;
        revenu2.revenuBrut = 10000;
        assert.equal(revenu2.revenuBrut, c.revenus[1].revenuBrut, 'Perte de la référence');

        assert.equal(c.revenuNetGlobal, revenu1.revenuNet + revenu2.revenuNet, 'Erreur dans le calcul du revenu net global');
        assert.equal(c.impotBrut, 133, 'Erreur dans le total...');

    });


});