var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RevenusCategoriels = require('../revenus-categoriels');
exports.CONSTANTES_TS_2015 = {
    MINI_ABATTEMENT: 426,
    MAXI_ABATTEMENT: 937,
    ABATTEMENT: 0.1
};
exports.CONSTANTES_PENSIONS_2015 = {
    MINI_ABATTEMENT: 379,
    MAXI_ABATTEMENT: 3711,
    ABATTEMENT: 0.1
};
var TraitementsSalaires = (function (_super) {
    __extends(TraitementsSalaires, _super);
    function TraitementsSalaires() {
        _super.call(this);
        this._traitementsSalairesPrincipal = 0;
        this._fraisReelPrincipal = 0;
        this._traitementsSalairesConjoint = 0;
        this._fraisReelConjoint = 0;
        this._traitementsSalairesAutres = 0;
        this._fraisReelAutres = 0;
        this._pensionsRetraitePrincipal = 0;
        this._pensionsRetraiteConjoint = 0;
        this._pensionsRetraiteAutres = 0;
    }
    Object.defineProperty(TraitementsSalaires.prototype, "traitementsSalairesPrincipal", {
        get: function () {
            return this._traitementsSalairesPrincipal;
        },
        set: function (v) {
            this._traitementsSalairesPrincipal = v;
            this.calculerRevenuNetPrincipal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "fraisReelPrincipal", {
        get: function () {
            return this._fraisReelPrincipal;
        },
        set: function (v) {
            this._fraisReelPrincipal = v;
            this.calculerRevenuNetPrincipal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "traitementsSalairesConjoint", {
        get: function () {
            return this._traitementsSalairesConjoint;
        },
        set: function (v) {
            this._traitementsSalairesConjoint = v;
            this.calculerRevenuNetConjoint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "fraisReelConjoint", {
        get: function () {
            return this._fraisReelConjoint;
        },
        set: function (v) {
            this._fraisReelConjoint = v;
            this.calculerRevenuNetConjoint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "traitementsSalairesAutres", {
        get: function () {
            return this._traitementsSalairesAutres;
        },
        set: function (v) {
            this._traitementsSalairesAutres = v;
            this.calculerRevenuNetAutres();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "fraisReelAutres", {
        get: function () {
            return this._fraisReelAutres;
        },
        set: function (v) {
            this._fraisReelAutres = v;
            this.calculerRevenuNetAutres();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "pensionsRetraitePrincipal", {
        get: function () {
            return this._pensionsRetraitePrincipal;
        },
        set: function (v) {
            this._pensionsRetraitePrincipal = v;
            this.calculerRevenuNetPrincipal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "pensionsRetraiteConjoint", {
        get: function () {
            return this._pensionsRetraiteConjoint;
        },
        set: function (v) {
            this._pensionsRetraiteConjoint = v;
            this.calculerRevenuNetConjoint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "pensionsRetraiteAutres", {
        get: function () {
            return this._pensionsRetraiteAutres;
        },
        set: function (v) {
            this._pensionsRetraiteAutres = v;
            this.calculerRevenuNetAutres();
        },
        enumerable: true,
        configurable: true
    });
    TraitementsSalaires.prototype.calculerRevenuNetPrincipal = function () {
        this.revenuNetPrincipal =
            this.calculerNetImposableTraitementsSalaires(this.traitementsSalairesPrincipal, this.fraisReelPrincipal)
                + this.calculetNetImposablePensions(this.pensionsRetraitePrincipal);
        this.calculerRevenuNet();
    };
    TraitementsSalaires.prototype.calculerRevenuNetConjoint = function () {
        this.revenuNetConjoint =
            this.calculerNetImposableTraitementsSalaires(this.traitementsSalairesConjoint, this.fraisReelConjoint)
                + this.calculetNetImposablePensions(this.pensionsRetraiteConjoint);
        this.calculerRevenuNet();
    };
    TraitementsSalaires.prototype.calculerRevenuNetAutres = function () {
        this.revenuNetAutres =
            this.calculerNetImposableTraitementsSalaires(this.traitementsSalairesAutres, this.fraisReelAutres)
                + this.calculetNetImposablePensions(this.pensionsRetraiteAutres);
        this.calculerRevenuNet();
    };
    TraitementsSalaires.prototype.calculerRevenuNet = function () {
        this.revenuNet =
            this.revenuNetAutres
                + this.revenuNetConjoint
                + this.revenuNetPrincipal;
    };
    TraitementsSalaires.prototype.calculerNetImposableTraitementsSalaires = function (brut, fraisReel) {
        if (fraisReel === void 0) { fraisReel = 0; }
        var abatt = brut * exports.CONSTANTES_TS_2015['ABATTEMENT'];
        if (abatt > exports.CONSTANTES_TS_2015['MAXI_ABATTEMENT']) {
            abatt = exports.CONSTANTES_TS_2015['MAXI_ABATTEMENT'];
        }
        else if (abatt < exports.CONSTANTES_TS_2015['MINI_ABATTEMENT']) {
            abatt = exports.CONSTANTES_TS_2015['MINI_ABATTEMENT'];
        }
        abatt = abatt > fraisReel ? abatt : fraisReel;
        return brut - abatt;
    };
    TraitementsSalaires.prototype.calculetNetImposablePensions = function (brut) {
        var abatt = brut * exports.CONSTANTES_PENSIONS_2015['ABATTEMENT'];
        if (abatt > exports.CONSTANTES_PENSIONS_2015['MAXI_ABATTEMENT']) {
            abatt = exports.CONSTANTES_PENSIONS_2015['MAXI_ABATTEMENT'];
        }
        else if (abatt < exports.CONSTANTES_PENSIONS_2015['MINI_ABATTEMENT']) {
            abatt = exports.CONSTANTES_PENSIONS_2015['MINI_ABATTEMENT'];
        }
        return brut - abatt;
    };
    return TraitementsSalaires;
})(RevenusCategoriels.RevenuCategoriel);
exports.TraitementsSalaires = TraitementsSalaires;
