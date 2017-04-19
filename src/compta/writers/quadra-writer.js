var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_writer_1 = require('./base-writer');
var QuadraWriter = (function (_super) {
    __extends(QuadraWriter, _super);
    function QuadraWriter() {
        _super.call(this);
    }
    QuadraWriter.prototype.toASCII = function (arg) {
        function writeJournal(_journal) {
            var journal = _journal;
            var file = '';
            journal.ecritures.forEach(function (e) {
                file += writeEcriture(e);
            }, this);
            return file;
            function writeEcriture(ecriture) {
                if (!ecriture.equilibre) {
                    throw new Error('L\'écriture n\'est pas équilibrée');
                }
                var res = '';
                var params = {
                    numeroCompte: null,
                    code: journal.code || 'VE',
                    date: ecriture.ecritureDate,
                    libelle: ecriture.libelle,
                    sens: null,
                    montant: null,
                    pieceRef: ecriture.pieceRef
                };
                ecriture.lignes.forEach(function (l) {
                    params.numeroCompte = l.compteNum;
                    params = base_writer_1.BaseWriter.getSens(l, params);
                    res += writeLineM(params);
                    res += '\r\n';
                }, this);
                return res;
                function writeLineM(params) {
                    function convertNumeroCompte(n) {
                        var res = n.toString();
                        if (res.length === 0 || res.length > 8) {
                            throw new Error('Le numero de compte est invalide');
                        }
                        else {
                            for (var i = res.length; i < 8; i++) {
                                res += '0';
                            }
                            return res;
                        }
                    }
                    function convertToCentimesSigne(v) {
                        var res = '+';
                        if (v < 0) {
                            res = '-';
                            v *= -1;
                        }
                        v *= 100;
                        v = Math.round(v);
                        var resValue = v.toString();
                        if (resValue.length > 12) {
                            throw new Error('Valeur trop grande');
                        }
                        else if (resValue.length < 12) {
                            for (var i = resValue.length; i < 12; i++) {
                                resValue = '0' + resValue;
                            }
                        }
                        var resultat = res + resValue;
                        return resultat;
                    }
                    var res = 'M';
                    res += convertNumeroCompte(params.numeroCompte);
                    res += params.code;
                    res += '000';
                    res += base_writer_1.BaseWriter.convertDate(params.date);
                    res += ' ';
                    res += base_writer_1.BaseWriter.convertToLength(params.libelle, 20);
                    res += params.sens;
                    res += convertToCentimesSigne(params.montant);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 8);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 6);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 2);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 3);
                    res += base_writer_1.BaseWriter.convertToLength(params.pieceRef, 5);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 10);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 10);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 8);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 3);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 3);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 1);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 1);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 1);
                    res += base_writer_1.BaseWriter.convertToLength(params.libelle, 30);
                    res += base_writer_1.BaseWriter.convertToLength(' ', 2);
                    res += base_writer_1.BaseWriter.convertToLength(params.pieceRef, 10);
                    return res;
                }
            }
        }
        var type = arg.constructor.name.toString();
        ;
        switch (type) {
            case 'Journal':
                return writeJournal(arg);
            default:
                return null;
        }
    };
    return QuadraWriter;
})(base_writer_1.BaseWriter);
exports.QuadraWriter = QuadraWriter;
