import { BaseWriter } from './base-writer';
import * as Models from '../models/models';

export class SageWriter extends BaseWriter {

    constructor() {
        super();
    }

    public toPNM(arg: any) {

        var type = (<any>arg).constructor.name.toString();

        switch (type) {
            case 'Journal':
            return writeJournal(arg);
            default:
            return null;
        }

        function writeJournal(_journal:any) {

            var journal = <Models.Journal>_journal;

            var res = '';
            res += writeLigneEnteteSociete();

            journal.ecritures.forEach(function(e) {
            res += writeEcriture(e);
            }, this);

            return res;

            function writeLigneEnteteSociete() {

            var res = 'entreprise ???\r\n';
            return res;

            }

            function writeEcriture(ecriture: Models.Ecriture) {

                var resEcriture = '';

                // params nécessaire pour l'écriture d'un ligne type M
                var params = {
                    numeroCompte: null,
                    code: BaseWriter.convertToLength(journal.code, 3) || 'VE ',
                    date: BaseWriter.convertDate(ecriture.ecritureDate),
                    libelle: ecriture.libelle,
                    sens: null,
                    montant: null,
                    pieceRef: ecriture.pieceRef
                }

                ecriture.lignes.forEach(function(l, index, array) {

                    resEcriture += writeLigne(l);
                    resEcriture += '\r\n';

                }, this);

                return resEcriture;

                function writeLigne(ligne: Models.Ligne) {

                    function convertToMontantSage(v: number) {

                        // mise sur la longeur quadra 12 signes pour le montant
                        var resValue = v.toString();

                        if (resValue.length > 20) {

                            throw new Error('Valeur trop grande');

                        } else if (resValue.length < 20) {

                            for (var i = resValue.length; i < 20; i++) {
                            resValue = ' ' + resValue;
                            }

                            return resValue;

                        }

                    }

                    var resLigne = '';
                    // code jouranl pos 1 long 3
                    resLigne += params.code;
                    // date pièce pos 4 long 6 JJMMAA
                    resLigne += params.date;
                    // type de pièce pos 10 long 2
                    resLigne += BaseWriter.convertToLength('', 2);
                    // compte general pos 12 long 13
                    resLigne += BaseWriter.convertToLength(ligne.compteNum, 13);
                    // type de compte pos 25 long
                    resLigne += BaseWriter.convertToLength('', 1);
                    // libelle de l'écriture pos 52 long 25
                    resLigne += BaseWriter.convertToLength(params.libelle, 25);
                    // mode de paiement pos 77 long 1
                    resLigne += ' ';
                    // date de l'échéance pos 78 long 6
                    resLigne += BaseWriter.convertToLength('', 6);

                    var paramsMontant = BaseWriter.getSens(ligne);

                    // sens pos 84 long 1
                    resLigne += paramsMontant.sens;
                    // type écriture pos 105 long 1
                    resLigne += convertToMontantSage(paramsMontant.montant);

                    // numero de pièce pos 106 long 7
                    resLigne += BaseWriter.convertToLength(params.pieceRef, 7);

                    resLigne += 'N';

                    return resLigne;

                }
            }
        }
    }
}