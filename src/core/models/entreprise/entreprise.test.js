var assert = require('chai').assert;
var Models = require('../models');

describe('Core.Models.Entreprise', function () {

    it('doit instancier une entreprise sans paramètres passés', function () {

        const e = new Models.Entreprise();
        assert.isDefined(e, 'L\'entreprise n\'est pas instanciée');
        assert.equal(e.personne.getName(), 'PersonnePhysique', 'Le type de personne par défaut n\'est pas PersonnePhysique');

    });

    it('doit instancier une entreprise et obtenir son nom', () => {

        const params1 = {
            personne: {
                nom: 'Bourdu',
                prenom: 'Pierre'
            }
        }

        let e1 = new Models.Entreprise(params1);
        assert.equal(e1.nomComplet, 'BOURDU PIERRE');

        e1.personne.nomCommercial = "WorkMind";
        assert.equal(e1.nomComplet, 'WorkMind');
        assert.equal(e1.nomComplet, e1.nomCompletCapital);

        const params2 = {
            personne: {
                forme: 'SAS',
                denominationSociale: 'QREA'
            },
            isCapitalVariable: false,
            capital: 16000
        }

        let e2 = new Models.Entreprise(params2);
        assert(e2.nomComplet, 'QREA SAS');
        assert(e2.nomCompletCapital, 'QREA SAS au capital de 16000 €');
        e2.isCapitalVariable = true;
        assert(e2.nomCompletCapital, 'QREA SAS au capital variable minimum de 16000 €');

        let e3 = new Models.Entreprise();
        assert(e2.nomComplet, ' '); // si aucun prenom, nom on doit avoir un string = ' '

        let e4 = new Models.Entreprise({
            personne: {
                forme: 'SAS',
                denominationSociale: 'QREA'
            }
        });

        assert(e4, 'QREA SAS au capital de ? €');

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

    it("doit modifier la personne", () => {

        const e = new Models.Entreprise({
            personne: {
                nom: 'BOURDU',
                prenom: 'Pierre'
            }
        });

        assert.isDefined(e);
        assert.equal(e.personne.getName(), 'PersonnePhysique');
        e.isPersonneMorale = true;
        assert.equal(e.personne.getName(), 'PersonneMorale');

    });

});