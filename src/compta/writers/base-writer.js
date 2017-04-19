"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseWriter = (function () {
    function BaseWriter() {
    }
    BaseWriter.convertToLength = function (t, l) {
        if (t.length > l) {
            return t.substr(0, l);
        }
        else if (t.length < l) {
            for (var i = t.length; i < l; i++) {
                t += ' ';
            }
            return t;
        }
        else {
            return t;
        }
    };
    BaseWriter.convertDate = function (d) {
        d = new Date(d);
        var dd = d.getDate().toString();
        if (dd.length === 1)
            dd = '0' + dd;
        var mm = (d.getMonth() + 1).toString();
        if (mm.length === 1)
            mm = '0' + mm;
        var yyyy = d.getFullYear().toString();
        yyyy = yyyy.substr(2, 2);
        var res = dd + mm + yyyy;
        return res;
    };
    BaseWriter.getSens = function (l, params) {
        if (params === void 0) { params = {}; }
        if (l.debit > 0) {
            params.sens = 'D';
            params.montant = l.debit;
        }
        else if (l.credit < 0) {
            params.sens = 'D';
            params.montant = -1 * l.credit;
        }
        else if (l.debit < 0) {
            params.sens = 'C';
            params.montant = -1 * l.debit;
        }
        else {
            params.sens = 'C';
            params.montant = l.credit;
        }
        return params;
    };
    return BaseWriter;
}());
exports.BaseWriter = BaseWriter;
