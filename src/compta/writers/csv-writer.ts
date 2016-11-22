import { BaseWriter } from './base-writer';
import * as Models from '../models/models';

export class CSVWriter extends BaseWriter {

    constructor() {
        super();
    }

    public toCSV(arg: any) {

        function writeJournal(_journal: any) {

            var journal = <Models.Journal>_journal;

            // ON ECRIT LES ENTETES DU CSV DANS LA PREMIERE LIGNE
            var res = 'ecritureDate;compteNum;ecritureLibelle;debit;credit;pieceRef\r\n';

            // pour chaque écriture
            journal.ecritures.forEach(function(e) {
                res += writeEcriture(e);
            }, this);

            return res;

            function writeEcriture(ecriture: Models.Ecriture) {

                var resEcriture = '';

                var params = {
                    numeroCompte: null,
                    journalCode: journal.journalCode || 'VE',
                    date: BaseWriter.convertDate(ecriture.ecritureDate),
                    libelle: ecriture.ecritureLib,
                    debit: null,
                    credit: null,
                    pieceRef: ecriture.pieceRef
                }

                ecriture.lignes.forEach(function(l: Models.Ligne) {
                    resEcriture += writeLigne(l);
                }, this);

                return resEcriture;

                function writeLigne(l: Models.Ligne) {

                    function convertMontantToStringCSV(montant) {

                    if (montant) {
                        var res = montant.toString();
                        return res.replace(".", ",");
                    } else {
                        return '0';
                    }

                    }

                    params.numeroCompte = l.compteNum;
                    params.debit = convertMontantToStringCSV(l.debit),
                    params.credit = convertMontantToStringCSV(l.credit);

                    // ecriture
                    // var resLigne = '%s;compteNum;ecritureLibelle;debit;credit;pieceRef\r\n';
                    var resLigne = params.date + ';';
                    resLigne += params.numeroCompte + ';';
                    resLigne += params.libelle + ';';
                    resLigne += params.debit + ';';
                    resLigne += params.credit + ';';
                    resLigne += params.pieceRef + ';';
                    resLigne += '\r\n';

                    return resLigne;

                }

            }

        }

        var type = (<any>arg).constructor.name.toString();

        switch (type) {
            case 'Journal':
            return writeJournal(arg);
            default:
            return null;
        }

    }

}