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
var SageWriter = (function (_super) {
    __extends(SageWriter, _super);
    function SageWriter() {
        return _super.call(this) || this;
    }
    SageWriter.prototype.toPNM = function (arg) {
        var type = arg.constructor.name.toString();
        switch (type) {
            case 'Journal':
                return writeJournal(arg);
            default:
                return null;
        }
        function writeJournal(_journal) {
            var journal = _journal;
            var res = '';
            res += writeLigneEnteteSociete();
            journal.ecritures.forEach(function (e) {
                res += writeEcriture(e);
            }, this);
            return res;
            function writeLigneEnteteSociete() {
                var res = 'entreprise ???\r\n';
                return res;
            }
            function writeEcriture(ecriture) {
                var resEcriture = '';
                var params = {
                    numeroCompte: null,
                    code: base_writer_1.BaseWriter.convertToLength(journal.code, 3) || 'VE ',
                    date: base_writer_1.BaseWriter.convertDate(ecriture.ecritureDate),
                    libelle: ecriture.libelle,
                    sens: null,
                    montant: null,
                    pieceRef: ecriture.pieceRef
                };
                ecriture.lignes.forEach(function (l, index, array) {
                    resEcriture += writeLigne(l);
                    resEcriture += '\r\n';
                }, this);
                return resEcriture;
                function writeLigne(ligne) {
                    function convertToMontantSage(v) {
                        var resValue = v.toString();
                        if (resValue.length > 20) {
                            throw new Error('Valeur trop grande');
                        }
                        else if (resValue.length < 20) {
                            for (var i = resValue.length; i < 20; i++) {
                                resValue = ' ' + resValue;
                            }
                            return resValue;
                        }
                    }
                    var resLigne = '';
                    resLigne += params.code;
                    resLigne += params.date;
                    resLigne += base_writer_1.BaseWriter.convertToLength('', 2);
                    resLigne += base_writer_1.BaseWriter.convertToLength(ligne.compteNum, 13);
                    resLigne += base_writer_1.BaseWriter.convertToLength('', 1);
                    resLigne += base_writer_1.BaseWriter.convertToLength(params.libelle, 25);
                    resLigne += ' ';
                    resLigne += base_writer_1.BaseWriter.convertToLength('', 6);
                    var paramsMontant = base_writer_1.BaseWriter.getSens(ligne);
                    resLigne += paramsMontant.sens;
                    resLigne += convertToMontantSage(paramsMontant.montant);
                    resLigne += base_writer_1.BaseWriter.convertToLength(params.pieceRef, 7);
                    resLigne += 'N';
                    return resLigne;
                }
            }
        }
    };
    return SageWriter;
}(base_writer_1.BaseWriter));
exports.SageWriter = SageWriter;
