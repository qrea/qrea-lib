var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var BaseArticle = (function (_super) {
    __extends(BaseArticle, _super);
    function BaseArticle(params) {
        _super.call(this, params);
        this.libelle = params && params.libelle ? params.libelle : 'Nouvel article';
        this.reference = params && params.reference ? params.reference : null;
    }
    BaseArticle.instanciateArticleOuGroupe = function (o) {
        if (o.qteArticles) {
            return GroupeArticles.instanciate(o);
        }
        else {
            return Article.instanciate(o);
        }
    };
    return BaseArticle;
})(base_1.default.BaseModel);
exports.BaseArticle = BaseArticle;
var QteArticles = (function (_super) {
    __extends(QteArticles, _super);
    function QteArticles(params) {
        _super.call(this, params);
        this.quantite = params && params.quantite ? params.quantite : 0;
        this.article = params && params.article ? params.article : null;
    }
    Object.defineProperty(QteArticles.prototype, "total", {
        get: function () {
            if (!this.quantite || !this.article || !this.article.prix) {
                console.warn('Impossible de calculer le total...');
                return 0;
            }
            return this.quantite * this.article.prix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QteArticles.prototype, "article", {
        get: function () {
            return this._article;
        },
        set: function (a) {
            this._article = Article.instanciate(a);
        },
        enumerable: true,
        configurable: true
    });
    return QteArticles;
})(base_1.default.BaseModel);
exports.QteArticles = QteArticles;
var GroupeArticles = (function (_super) {
    __extends(GroupeArticles, _super);
    function GroupeArticles(params) {
        _super.call(this, params);
        this.qteArticles = params && params.qteArticles ? params.qteArticles : new Array();
    }
    Object.defineProperty(GroupeArticles.prototype, "qteArticles", {
        get: function () {
            return this._qteArticles;
        },
        set: function (articles) {
            this._qteArticles ? this._qteArticles.length = 0 : this._qteArticles = [];
            if (Array.isArray(articles)) {
                for (var i = 0; i < articles.length; i++) {
                    var element = articles[i];
                    this._qteArticles.push(QteArticles.instanciate(element));
                }
            }
            else {
                this._qteArticles.push(QteArticles.instanciate(articles));
            }
        },
        enumerable: true,
        configurable: true
    });
    GroupeArticles.prototype.addQteArticles = function (q) {
        this._qteArticles.push(QteArticles.instanciate(q));
    };
    Object.defineProperty(GroupeArticles.prototype, "prix", {
        get: function () {
            var p = 0;
            for (var i = 0; i < this.qteArticles.length; i++) {
                var q = this.qteArticles[i];
                p += q.total;
            }
            return p;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupeArticles.prototype, "tauxTVA", {
        get: function () {
            var totalQte = 0;
            var somme = 0;
            for (var i = 0; i < this.qteArticles.length; i++) {
                var q = this.qteArticles[i];
                totalQte += q.quantite;
                somme += q.article.tauxTVA * q.quantite;
            }
            var tauxPondere = somme / totalQte * 100;
            var tauxArrondi = this.round(tauxPondere);
            return tauxArrondi / 100;
        },
        enumerable: true,
        configurable: true
    });
    return GroupeArticles;
})(BaseArticle);
exports.GroupeArticles = GroupeArticles;
var Article = (function (_super) {
    __extends(Article, _super);
    function Article(params) {
        _super.call(this, params);
        this.unite = params && params.unite ? params.unite : null;
        this.prix = params && params.prix ? params.prix : 0;
        this.tauxTVA = params && params.tauxTVA ? params.tauxTVA : 0;
    }
    return Article;
})(BaseArticle);
exports.Article = Article;
