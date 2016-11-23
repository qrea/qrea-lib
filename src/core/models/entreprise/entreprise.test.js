var assert = require('chai').assert;
var Models = require('../models');

describe('Core.Models.Entreprise', function () {

    it('doit instancier une entreprise sans paramètres passés', function () {

        const e = new Models.Entreprise();
        assert.isDefined(e, 'L\'entreprise n\'est pas instanciée');
        assert.equal(e.personne.getName(), 'PersonnePhysique', 'Le type de personne par défaut n\'est pas PersonnePhysique');
        
    });

    it('doit instancier une entreprise avec des paramètres', () => {

        const params = {
            capital: 15000,
            personne: new Models.PersonnePhysique({
                nom: 'Bourdu',
                prenom: 'Pierre'
            }),
            isCapitalVariable: false
        };

        const e = new Models.Entreprise(params);

        assert.equal(e.personne.nom, 'Bourdu');
        assert.equal(e.isCapitalVariable, false);
        assert.equal(e.capital, 15000);

    });

});