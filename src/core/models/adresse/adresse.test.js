var assert = require('chai').assert;
var module = require('./adresse');

describe('Core.Models.Adresse', () => {

    it('doit instancier une adresse', () => {
        let adresse = new module.Adresse();
        assert.isDefined(adresse);
    });

    it('doit vérifier si une adresse est valide', () => {

        let adresse = new module.Adresse();
        assert.isFalse(adresse.estValide());

        adresse.nom = 'M BOURDU';
        adresse.ligne1 = 'Le dognon';
        adresse.cp = '86908';
        adresse.ville = 'POITIERS';

        assert.isTrue(adresse.estValide());

    });

});