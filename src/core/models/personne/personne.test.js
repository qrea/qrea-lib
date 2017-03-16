var assert = require('chai').assert;
var Models = require('../models');

describe('Core.Models.Personne', function () {

    it('doit instancier une personne physique automatiquement', function () {

        const personnePhysique = Models.Personne.instanciatePhysiqueOuMorale({
            nom: 'BOURDU',
            prenom: 'Pierre'
        });

        assert.isDefined(personnePhysique);
        //console.log(personnePhysique.getName());
        assert.equal(personnePhysique.getName(), 'PersonnePhysique');
        assert.equal(personnePhysique.nom, 'BOURDU');
        assert.equal(personnePhysique.nomComplet, 'BOURDU PIERRE');

    });

    it('doit instancier une personne morale et obtenir son nom complet', function () {

        const p = Models.Personne.instanciatePhysiqueOuMorale({
            forme: 'sci',
            denominationSociale: 'de la feuille'
        });

        assert.isDefined(p);
        assert.equal(p.nomComplet, 'SCI DE LA FEUILLE');

    });

});