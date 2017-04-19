var assert = require('chai').assert;
var Compta = require('./compta');

describe('Compta.Models', function () {

    describe('#Comptabilite', () => {

        it('doit instancier une comptabilite', () => {
            let c = new Compta.Models.Comptabilite({})
            assert.isDefined(c);
        });

        it('doit créer un journal et calculer le solde du compte 622', () => {

            let j = new Compta.Models.Journal({
                code: 'OD',
                libelle: 'Opérations diverses'
            });

            assert.equal(j.code, 'OD');

            let sommeTheorique = 0;

            for (let i = 0; i < 10; i++) {

                let amount = Math.floor(Math.random() * 1000);

                sommeTheorique += amount;

                let e = new Compta.Models.Ecriture({});
                let d = new Date(2016, 1, 27);
                e.ecritureDate = d;

                let l = new Compta.Models.Ligne({
                    debit: amount,
                    compteNum: '622'
                });

                e.addLigne(l);

                let l2 = new Compta.Models.Ligne({
                    credit: amount,
                    libelle: 'tests',
                    compteNum: '401'
                });
                e.addLigne(l2);
                e.libelle = 'test ecriture';

                // console.log('%s | %s | %s | %s | %s', e.ecritureDate.toString(), l.compteNum, e.libelle, l.debit.toString(), l.credit.toString());
                // console.log('%s | %s | %s | %s | %s', e.ecritureDate.toString(), l2.compteNum, e.libelle, l2.debit.toString(), l2.credit.toString());

                j.addEcriture(e);

            }

            assert.equal(sommeTheorique, j.getSolde('6220'), 'Le solde du journal ne correspond pas avec les écritures renseignées');

        });

    });

});