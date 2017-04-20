var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var core_1 = require('../../../core/core');
var reglement_1 = require('../reglement/reglement');
var vente_1 = require('../vente/vente');
var logo_1 = require('../logo/logo');
var helpers_1 = require('../../helpers/helpers');
var Document = (function (_super) {
    __extends(Document, _super);
    function Document(params) {
        _super.call(this, params);
        this.libelle = params && params.libelle ? params.libelle : null;
        this.date = params && params.date ? params.date : new Date();
        this.numero = params && params.numero ? params.numero : null;
        this.entreprise = params && params.entreprise ? params.entreprise : new core_1.Models.Entreprise();
        this.client = params && params.client ? params.client : new core_1.Models.Personne();
        this.ventes = params && params.ventes ? params.ventes : new Array();
        this.prctRemiseGlobale = params && params.prctRemiseGlobale ? params.prctRemiseGlobale : 0;
        this.isAutoliquidation = params && params.isAutoliquidation ? params.isAutoliquidation : false;
        this.reglements = params && params.reglements ? params.reglements : new Array();
        this.adresseLivraison = params && params.adresseLivraison ? params.adresseLivraison : new core_1.Models.Adresse({});
        this.details = params.details && params ? params.details : null;
        this.logo = params && params.logo ? params.logo : null;
        this.detailsTVA = params && params.detailsTva ? params.detailsTva : {};
        if (this['calculate'])
            this.calculate();
    }
    Document.prototype.calculate = function () {
        var self = this;
        var d = {};
        self._totalHT = 0;
        self._totalTTC = 0;
        self._totalTVA = 0;
        if (self.ventes && Array.isArray(self.ventes)) {
            self.ventes.forEach(function (vente) {
                self._totalHT += vente.totalHT;
                self._totalTVA += vente.totalTVA;
                self._totalTTC += vente.totalTTC;
                if (!d[vente.article.tauxTVA.toString()]) {
                    var details = new DetailsTVA(vente.article.tauxTVA);
                    d[vente.article.tauxTVA.toString()] = details;
                }
                d[vente.article.tauxTVA.toString()].base += vente.totalHT;
            });
        }
        self._totalTVA = self.round(self._totalTVA);
        self._totalHT = self.round(self._totalHT);
        self._totalTTC = self.round(self._totalTTC);
        self.detailsTVA = d;
        calculateNetAPayer();
        function calculateNetAPayer() {
            var regle = 0;
            if (Array.isArray(self.reglements)) {
                self.reglements.forEach(function (r) {
                    if (r.paye === true)
                        regle = r.montant;
                });
            }
            self._netAPayer = self.round(self._totalTTC - regle);
        }
    };
    Document.prototype.removeVenteByIndex = function (index) {
        this.ventes.splice(index, 1);
        this.calculate();
    };
    Document.prototype.addReglement = function (newReglt) {
        this.reglements.push(reglement_1.Reglement.instanciate(newReglt));
        this.calculate();
    };
    Document.prototype.removeReglementByIndex = function (index) {
        this.reglements.splice(index, 1);
        this.calculate();
    };
    Document.prototype.toDDO = function () {
        var ddo = helpers_1.DocumentDefinitionObjectHelper.getDDO('template1');
        return ddo;
    };
    Object.defineProperty(Document.prototype, "totalHT", {
        get: function () {
            this.calculate();
            return this._totalHT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "totalTTC", {
        get: function () {
            this.calculate();
            return this._totalTTC;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "totalTVA", {
        get: function () {
            this.calculate();
            return this._totalTVA;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "netAPayer", {
        get: function () {
            this.calculate();
            return this._netAPayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "entreprise", {
        get: function () {
            return this._entreprise;
        },
        set: function (e) {
            this._entreprise = e;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "logo", {
        get: function () {
            return this._logo;
        },
        set: function (l) {
            this._logo = logo_1.Logo.instanciate(l);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "client", {
        get: function () {
            return this._client;
        },
        set: function (c) {
            this._client = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "reglements", {
        get: function () {
            return this._reglements;
        },
        set: function (reglts) {
            this._reglements = reglts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "ventes", {
        get: function () {
            return this._ventes;
        },
        set: function (ventes) {
            this._ventes = ventes;
        },
        enumerable: true,
        configurable: true
    });
    Document.prototype.addVente = function (newVente) {
        this._ventes.push(vente_1.Vente.instanciate(newVente));
        this.calculate();
    };
    Object.defineProperty(Document.prototype, "adresseLivraison", {
        get: function () {
            return this._adresseLivraison;
        },
        set: function (a) {
            this._adresseLivraison = core_1.Models.Adresse.instanciate(a);
        },
        enumerable: true,
        configurable: true
    });
    return Document;
})(base_1.default.BaseModel);
exports.Document = Document;
var DetailsTVA = (function (_super) {
    __extends(DetailsTVA, _super);
    function DetailsTVA(taux, base) {
        _super.call(this, {});
        this._taux = taux;
        this._base = base || 0;
        this.calculate();
    }
    DetailsTVA.prototype.calculate = function () {
        this.tva = this._taux * this._base;
        this.tva = this.round(this.tva);
    };
    Object.defineProperty(DetailsTVA.prototype, "taux", {
        get: function () {
            return this._taux;
        },
        set: function (newValue) {
            this._taux = newValue;
            this.calculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailsTVA.prototype, "base", {
        get: function () {
            return this._base;
        },
        set: function (newValue) {
            this._base = newValue;
            this.calculate();
        },
        enumerable: true,
        configurable: true
    });
    return DetailsTVA;
})(base_1.default.BaseModel);
exports.DetailsTVA = DetailsTVA;
var Facture = (function (_super) {
    __extends(Facture, _super);
    function Facture(params) {
        _super.call(this, params);
    }
    return Facture;
})(Document);
exports.Facture = Facture;
var FactureAcompte = (function (_super) {
    __extends(FactureAcompte, _super);
    function FactureAcompte(params) {
        _super.call(this, params);
        this.acompteHT = params && params.acompteHT ? params.acompteHT : 0;
        this.acompteTVA = params && params.acompteTVA ? params.acompteTVA : 0;
    }
    Object.defineProperty(FactureAcompte.prototype, "acompteTTC", {
        get: function () {
            return this.acompteHT + this.acompteTVA;
        },
        enumerable: true,
        configurable: true
    });
    return FactureAcompte;
})(Document);
exports.FactureAcompte = FactureAcompte;
var Devis = (function (_super) {
    __extends(Devis, _super);
    function Devis(params) {
        _super.call(this, params);
        this.dateValidite = params && params.dateValidite ? params.dateValidite : new Date(this.date.getFullYear(), this.date.getMonth() < 11 ? this.date.getMonth() + 1 : 0, this.date.getDate());
    }
    return Devis;
})(Document);
exports.Devis = Devis;
