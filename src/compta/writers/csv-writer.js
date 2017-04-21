"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_writer_1 = require("./base-writer");
var CSVWriter = (function (_super) {
    __extends(CSVWriter, _super);
    function CSVWriter() {
        return _super.call(this) || this;
    }
    CSVWriter.prototype.toCSV = function (arg) {
        function writeJournal(_journal) {
            var journal = _journal;
            var res = 'ecritureDate;compteNum;libelleelle;debit;credit;pieceRef\r\n';
            journal.ecritures.forEach(function (e) {
                res += writeEcriture(e);
            }, this);
            return res;
            function writeEcriture(ecriture) {
                var resEcriture = '';
                var params = {
                    numeroCompte: null,
                    code: journal.code || 'VE',
                    date: base_writer_1.BaseWriter.convertDate(ecriture.ecritureDate),
                    libelle: ecriture.libelle,
                    debit: null,
                    credit: null,
                    pieceRef: ecriture.pieceRef
                };
                ecriture.lignes.forEach(function (l) {
                    resEcriture += writeLigne(l);
                }, this);
                return resEcriture;
                function writeLigne(l) {
                    function convertMontantToStringCSV(montant) {
                        if (montant) {
                            var res = montant.toString();
                            return res.replace(".", ",");
                        }
                        else {
                            return '0';
                        }
                    }
                    params.numeroCompte = l.compteNum;
                    params.debit = convertMontantToStringCSV(l.debit),
                        params.credit = convertMontantToStringCSV(l.credit);
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
        var type = arg.constructor.name.toString();
        switch (type) {
            case 'Journal':
                return writeJournal(arg);
            default:
                return null;
        }
    };
    return CSVWriter;
}(base_writer_1.BaseWriter));
exports.CSVWriter = CSVWriter;
