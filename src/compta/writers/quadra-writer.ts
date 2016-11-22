import { BaseWriter } from './base-writer';
import * as Models from '../models/models';

export class QuadraWriter extends BaseWriter {

    constructor() {
        super();
    }

    public toASCII(arg: any) {

        function writeJournal(_journal: any) {

            var journal = <Models.Journal>_journal;

            var file = '';

            journal.ecritures.forEach(function(e: Models.Ecriture) {
            file += writeEcriture(e);
            }, this);

            return file;

            function writeEcriture(ecriture: Models.Ecriture) {

            if (!ecriture.equilibre) {
                throw new Error('L\'écriture n\'est pas équilibrée');
            }

            // ini du texte
            var res = '';

            // params nécessaire pour l'écriture d'un ligne type M
            var params = {
                numeroCompte: null,
                code: journal.code || 'VE',
                date: ecriture.ecritureDate,
                libelle: ecriture.libelle,
                sens: null,
                montant: null,
                pieceRef: ecriture.pieceRef
            }

            // on parcours chaque ligne
            ecriture.lignes.forEach(function(l: Models.Ligne) {

                params.numeroCompte = l.compteNum;

                params = BaseWriter.getSens(l, params);

                res += writeLineM(params);
                res += '\r\n';

            }, this);

            return res;

            function writeLineM(params) {

                /**
                 * convertNumeroCompte - Convertir le numéro du compte
                 *
                 * @param  {string || number} n numero de compte
                 * @return {string}   numero de compte sous 8 caractères
                 */
                function convertNumeroCompte(n) {

                    var res = n.toString();

                    if (res.length === 0 || res.length > 8) {
                        throw new Error('Le numero de compte est invalide');
                    } else {
                        for (var i = res.length; i < 8; i++) {
                        res += '0';
                        }
                        return res;
                    }

                }

                /**
                 * convertToCentimesSigne - Convertir un montant en centimes signé
                 * sur 13 caractères
                 *
                 * @param  {nmuber} v: number valeur à convertir
                 * @return {string}           valeur sur 13 caractères en centimes signé
                 */
                function convertToCentimesSigne(v: number) {

                    // par défaut valeur > 0
                    var res = '+';
                    // sinon on retraite
                    if (v < 0) {
                        res = '-';
                        v *= -1;
                    }

                    // passage en centimes
                    v *= 100;
                    v = Math.round(v);

                    // mise sur la longeur quadra 12 signes pour le montant
                    var resValue = v.toString();

                    if (resValue.length > 12) {

                        throw new Error('Valeur trop grande');

                    } else if (resValue.length < 12) {

                        for (var i = resValue.length; i < 12; i++) {
                        resValue = '0' + resValue;

                        }

                    }

                    // fin on retourne
                    var resultat = res + resValue;

                    return resultat;

                }

                // * Type = M 1 1
                var res = 'M';
                // * * Numéro de compte 2 8
                res += convertNumeroCompte(params.numeroCompte);
                //* * Code journal sur 2 caract. (obligatoire même si renseigné en 111 sur 3) 10 2
                res += params.code;
                // * * N° folio (à initialiser à "000" si pas de folio) 12 3
                res += '000';
                // * * Date écriture (JJMMAA) 15 6
                res += BaseWriter.convertDate(params.date);
                // *  Code libellé 21 1
                res += ' ';
                // * Libellé libre 22 20
                res += BaseWriter.convertToLength(params.libelle, 20);
                // * * Sens Débit/Crédit (D/C) 42 1
                res += params.sens;
                // * * Montant en centimes signé (position 43=signe) 43 13
                res += convertToCentimesSigne(params.montant);
                // * Compte de contrepartie 56 8
                res += BaseWriter.convertToLength(' ', 8);
                // *  Date échéance (JJMMAA) 64 6
                res += BaseWriter.convertToLength(' ', 6);
                // * Code lettrage 70 2
                res += BaseWriter.convertToLength(' ', 2);
                // *  Code statistiques 72 3
                res += BaseWriter.convertToLength(' ', 3);
                // *  N° de pièce sur 5 caractères maximum 75 5
                res += BaseWriter.convertToLength(params.pieceRef, 5)
                // * Code affaire 80 10
                res += BaseWriter.convertToLength(' ', 10);
                // *  Quantité 1 90 10
                res += BaseWriter.convertToLength(' ', 10);
                // * Numéro de pièce jusqu'à 8 caractères 100 8
                res += BaseWriter.convertToLength(' ', 8);
                // * Code devise (FRF ou EUR, Espace = FRF, ou Devise) 108 3
                res += BaseWriter.convertToLength(' ', 3);
                // * QC Windows seulement
                // * * Code journal sur 3 caractères 111 3
                res += BaseWriter.convertToLength(' ', 3);
                // * Flag Code TVA géré dans l'écriture = O (oui) 114 1
                res += BaseWriter.convertToLength(' ', 1);
                // * Code TVA   = 0 à 9 115 1
                res += BaseWriter.convertToLength(' ', 1);
                // * Méthode de calcul TVA  = D (Débits) ou E (Encaissements) 116 1
                res += BaseWriter.convertToLength(' ', 1);
                // QC Windows seulement
                // Libellé écriture sur 30 caract. (blanc si renseigné en 22 sur 20 caract.) 117 30
                res += BaseWriter.convertToLength(params.libelle, 30);
                // Code TVA sur 2 caractères 147 2
                res += BaseWriter.convertToLength(' ', 2);
                // N° de pièce alphanumérique sur 10 caract. 149 10
                res += BaseWriter.convertToLength(params.pieceRef, 10);
                // Réservé 159 10
                // QC Windows seulement
                // Montant dans la devise (en centimes signés position 169=signe) 169 13
                // QC Windows Importation seulement
                // Pièce jointe à l'écriture, nom du fichier sur 8 caractères + extension sur 3 caractères – Cf. Remarque 182 12
                // QC Windows seulement
                // Quantité 2 194 10
                // QC Windows Exportation seulement
                // NumUniq 204 10
                // Code opérateur 214 4
                // Date système 218 14

                return res;

            }

            }

        }

        var type = (<any>arg).constructor.name.toString();;

        switch (type) {
            case 'Journal':
            return writeJournal(arg);
            default:
            return null;
        }

    }

}