var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var article_1 = require('../article/article');
var Vente = (function (_super) {
    __extends(Vente, _super);
    function Vente(params) {
        _super.call(this, params);
        this.article = params && params.article ? params.article : new article_1.Article();
        this.quantite = params && params.quantite ? params.quantite : 0;
        this.prctRemise = params && params.prctRemise ? params.prctRemise : 0;
        this.calculate();
    }
    Vente.prototype.calculate = function () {
        if (!this.article || !this._quantite) {
            this._totalHT = 0;
            this._totalTTC = 0;
            this._totalTVA = 0;
            return;
        }
        else {
            this._totalHT = this.article.prix * this._quantite;
            if (this.prctRemise) {
                this._totalHT = this._totalHT * (1 - this.prctRemise);
            }
            this._totalHT = this.round(this._totalHT);
            this._totalTVA = this.round(this._totalHT * this.article.tauxTVA);
            this._totalTTC = this._totalTVA + this._totalHT;
        }
    };
    Object.defineProperty(Vente.prototype, "article", {
        get: function () {
            return this._article;
        },
        set: function (a) {
            this._article = article_1.BaseArticle.instanciateArticleOuGroupe(a);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vente.prototype, "quantite", {
        get: function () {
            return this._quantite;
        },
        set: function (newQuantite) {
            this._quantite = newQuantite;
            this.calculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vente.prototype, "totalHT", {
        get: function () {
            this.calculate();
            return this._totalHT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vente.prototype, "totalTTC", {
        get: function () {
            this.calculate();
            return this._totalTTC;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vente.prototype, "totalTVA", {
        get: function () {
            this.calculate();
            return this._totalTVA;
        },
        enumerable: true,
        configurable: true
    });
    return Vente;
})(base_1.default.BaseModel);
exports.Vente = Vente;
