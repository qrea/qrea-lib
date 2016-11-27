var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base/base');
exports.TAUX_IMPOT_PV_IMMO = 0.19;
exports.ABATTEMENTS_PV_IMMO = [
    { "annee": 6, "abattIr": 0.0165, "abattPS": 0.06 },
    { "annee": 7, "abattIr": 0.033, "abattPS": 0.12 },
    { "annee": 8, "abattIr": 0.0495, "abattPS": 0.18 },
    { "annee": 9, "abattIr": 0.066, "abattPS": 0.24 },
    { "annee": 10, "abattIr": 0.0825, "abattPS": 0.3 },
    { "annee": 11, "abattIr": 0.099, "abattPS": 0.36 },
    { "annee": 12, "abattIr": 0.1155, "abattPS": 0.42 },
    { "annee": 13, "abattIr": 0.132, "abattPS": 0.48 },
    { "annee": 14, "abattIr": 0.1485, "abattPS": 0.54 },
    { "annee": 15, "abattIr": 0.165, "abattPS": 0.6 },
    { "annee": 16, "abattIr": 0.1815, "abattPS": 0.66 },
    { "annee": 17, "abattIr": 0.198, "abattPS": 0.72 },
    { "annee": 18, "abattIr": 0.2145, "abattPS": 0.78 },
    { "annee": 19, "abattIr": 0.231, "abattPS": 0.84 },
    { "annee": 20, "abattIr": 0.2475, "abattPS": 0.9 },
    { "annee": 21, "abattIr": 0.264, "abattPS": 0.96 },
    { "annee": 22, "abattIr": 0.28, "abattPS": 1 },
    { "annee": 23, "abattIr": 0.37, "abattPS": 1 },
    { "annee": 24, "abattIr": 0.46, "abattPS": 1 },
    { "annee": 25, "abattIr": 0.55, "abattPS": 1 },
    { "annee": 26, "abattIr": 0.64, "abattPS": 1 },
    { "annee": 27, "abattIr": 0.73, "abattPS": 1 },
    { "annee": 28, "abattIr": 0.82, "abattPS": 1 },
    { "annee": 29, "abattIr": 0.91, "abattPS": 1 },
    { "annee": 30, "abattIr": 1, "abattPS": 1 }
];
var PlusValueImmobiliereCalculette = (function (_super) {
    __extends(PlusValueImmobiliereCalculette, _super);
    function PlusValueImmobiliereCalculette(params) {
        _super.call(this, params);
        this.modificiations = false;
        this.hydrateParams(params);
    }
    PlusValueImmobiliereCalculette.prototype.hydrateParams = function (params) {
        this._dateCession = params.dateCession ? params.dateCession : null;
        this._dateAcquisition = params.dateAcquisition ? params.dateAcquisition : null;
        this._prixRevient = params.prixRevient ? params.prixRevient : null;
        this._prixCession = params.prixCession ? params.prixCession : null;
        this._travaux = params.travaux ? params.travaux : 0;
        this._fraisAcquisition = params.fraisAcquisition ? params.fraisAcquisition : 0;
        this.calculer();
    };
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "dateCession", {
        get: function () {
            return this._dateCession;
        },
        set: function (value) {
            this._dateCession = value;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "dateAcquisition", {
        get: function () {
            return this._dateAcquisition;
        },
        set: function (value) {
            this._dateAcquisition = value;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "prixRevient", {
        get: function () {
            return this._prixRevient;
        },
        set: function (value) {
            this._prixRevient = value;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "prixCession", {
        get: function () {
            return this._prixCession;
        },
        set: function (value) {
            this._prixCession = value;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "travaux", {
        get: function () {
            return this._travaux;
        },
        set: function (value) {
            this._travaux = value;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "fraisAcquisition", {
        get: function () {
            return this._fraisAcquisition;
        },
        set: function (value) {
            this._fraisAcquisition = value;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "dureeDetention", {
        get: function () {
            return this._dureeDetention;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "majoFrais", {
        get: function () {
            return this._majoFrais;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "majoTravaux", {
        get: function () {
            return this._majoTravaux;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "pxAcquisitionMajo", {
        get: function () {
            return this._pxAcquisitionMajo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "pvBrute", {
        get: function () {
            return this._pvBrute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "abattementIr", {
        get: function () {
            return this._abattementIr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "abttIrM", {
        get: function () {
            return this._abttIrM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "pvNetteIr", {
        get: function () {
            return this._pvNetteIr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "irCession", {
        get: function () {
            return this._irCession;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "surtaxe", {
        get: function () {
            return this._surtaxe;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "abattementPs", {
        get: function () {
            return this._abattementPs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "abttPsM", {
        get: function () {
            return this._abttPsM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "pvNettePS", {
        get: function () {
            return this._pvNettePS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "psCession", {
        get: function () {
            return this._psCession;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "totalImpots", {
        get: function () {
            return this._totalImpots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValueImmobiliereCalculette.prototype, "soldeNet", {
        get: function () {
            return this._soldeNet;
        },
        enumerable: true,
        configurable: true
    });
    PlusValueImmobiliereCalculette.calculer = function (params) {
        if (params) {
            return new PlusValueImmobiliereCalculette(params);
        }
    };
    PlusValueImmobiliereCalculette.prototype.calculer = function () {
        if (!this._dateCession && !this._dateAcquisition && !this._prixCession && !this._prixRevient)
            return;
        this._dureeDetention = this.dateDiff(this._dateAcquisition, this._dateCession);
        this._majoFrais = this.calculerMajorationFrais(this._fraisAcquisition, this._prixRevient);
        this._majoTravaux = this.calculerMajorationTravaux(this._travaux, this._prixRevient, this._dureeDetention);
        this._pxAcquisitionMajo = this._prixRevient + this._majoFrais + this._majoTravaux;
        this._pvBrute = this.retraiterZeroNegatif(this._prixCession - this._pxAcquisitionMajo);
        this._abattementIr = this.calculerAbattIr(this._dureeDetention);
        this._abttIrM = this.abattementIr / 100 * this._pvBrute;
        this._pvNetteIr = this._pvBrute - this._abttIrM;
        this._irCession = this._pvNetteIr * 0.19;
        this._surtaxe = this.calculerSurtaxe(this._pvNetteIr);
        this._abattementPs = this.calculerAbattps(this._dureeDetention);
        this._abttPsM = this._abattementPs / 100 * this._pvBrute;
        this._pvNettePS = this._pvBrute - this._abttPsM;
        this._psCession = this._pvNettePS * 0.155;
        this._totalImpots = this._psCession + this._surtaxe + this._irCession;
        this._soldeNet = this._prixCession - this._totalImpots;
        return null;
    };
    PlusValueImmobiliereCalculette.prototype.dateDiff = function (dateOld, dateNew) {
        // console.log('dateOld %s dateNew %s', dateOld, dateNew);
        var ynew = dateNew.getFullYear();
        var mnew = dateNew.getMonth();
        var dnew = dateNew.getDate();
        var yold = dateOld.getFullYear();
        var mold = dateOld.getMonth();
        var dold = dateOld.getDate();
        var diffa = ynew - yold;
        if (mold > mnew) {
            diffa = diffa - 1;
        }
        else if (mold == mnew) {
            if (dold > dnew) {
                diffa = diffa - 1;
            }
        }
        return diffa;
    };
    PlusValueImmobiliereCalculette.prototype.calculerMajorationFrais = function (f, s) {
        var majo = 0.075 * s;
        if (f > 0.075 * s) {
            majo = f;
        }
        return majo;
    };
    PlusValueImmobiliereCalculette.prototype.retraiterZeroNegatif = function (value) {
        if (value < 0)
            return 0;
        return value;
    };
    PlusValueImmobiliereCalculette.prototype.calculerMajorationTravaux = function (f, s, d) {
        var majo = f;
        if (d > 5) {
            if (f < 0.15 * s) {
                majo = 0.15 * s;
            }
            ;
        }
        {
            return majo;
        }
    };
    PlusValueImmobiliereCalculette.prototype.calculerAbattIr = function (d) {
        if (d < 6) {
            return 0;
        }
        else if (d <= 30) {
            d = d - 6;
            return exports.ABATTEMENTS_PV_IMMO[d].abattIr * 100;
        }
        else {
            return 100;
        }
    };
    PlusValueImmobiliereCalculette.prototype.calculerAbattps = function (d) {
        if (d < 6) {
            return 0;
        }
        else if (d <= 30) {
            d = d - 6;
            return exports.ABATTEMENTS_PV_IMMO[d].abattPS * 100;
        }
        else {
            return 100;
        }
    };
    PlusValueImmobiliereCalculette.prototype.calculerSurtaxe = function (PV) {
        var surT = 0;
        if (PV < 50000) {
            surT = 0;
        }
        if (PV < 60000) {
            surT = 2 / 100 * PV - (60000 - PV) * 1 / 20;
        }
        if (PV < 100000) {
            surT = 2 / 100 * PV;
        }
        if (PV < 110000) {
            surT = 3 / 100 * PV - (110000 - PV) * 1 / 10;
        }
        if (PV < 150000) {
            surT = 3 / 100 * PV;
        }
        if (PV < 160000) {
            surT = 4 / 100 * PV - (160000 - PV) * 15 / 100;
        }
        if (PV < 200000) {
            surT = 4 / 100 * PV;
        }
        if (PV < 210000) {
            surT = 5 / 100 * PV - (210000 - PV) * 20 / 100;
        }
        if (PV < 250000) {
            surT = 5 / 100 * PV;
        }
        if (PV < 260000) {
            surT = 6 / 100 * PV - (260000 - PV) * 25 / 100;
        }
        if (PV < 260000) {
            surT = 6 / 100 * PV;
        }
        return surT;
    };
    return PlusValueImmobiliereCalculette;
})(base_1.BaseCalculette);
exports.PlusValueImmobiliereCalculette = PlusValueImmobiliereCalculette;
