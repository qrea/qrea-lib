import Base from '../../base/base';
import * as Models from '../models/models';

export class BaseWriter {

    constructor() { }

    /**
     * convertToLength - Convertir la chaine de caractère à
     * la longueur désirée
     *
     * @param  {string} t: string texte en entrée
     * @param  {number} l: number longueur désirée
     * @return {string}           texte à la longueur désirée
     */
    static convertToLength(t: string, l: number) {

        if (t.length > l) {
            // on doit prendre uniquement les l caractères
            return t.substr(0, l);
        } else if (t.length < l) {
            for (var i = t.length; i < l; i++) {
            t += ' ';
            }
            return t;
        } else {
            return t;
        }

    }

    /**
     * convertDate - Convertir la date au format requis par quadra DDMMYY
     *
     * @param  {date} d la date à convertir
     * @return {string}   la date au format DDMMYY
     */
    static convertDate(d) {

        d = new Date(d);

        var dd = d.getDate().toString();
        if (dd.length === 1) dd = '0' + dd;
        var mm = (d.getMonth() + 1).toString();
        if (mm.length === 1) mm = '0' + mm;
        var yyyy = d.getFullYear().toString();
        yyyy = yyyy.substr(2, 2);

        var res = dd + mm + yyyy;
        return res;

    }

    static getSens(l: Models.Ligne, params: any = {}) {

        if (l.debit > 0) {
            params.sens = 'D';
            params.montant = l.debit;
        } else if (l.credit < 0) {
            params.sens = 'D';
            params.montant = -1 * l.credit;
        } else if (l.debit < 0) {
            params.sens = 'C';
            params.montant = -1 * l.debit;
        } else {
            params.sens = 'C';
            params.montant = l.credit;
        }

        return params;

    }

}