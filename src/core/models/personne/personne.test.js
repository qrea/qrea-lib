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
        
    });


});