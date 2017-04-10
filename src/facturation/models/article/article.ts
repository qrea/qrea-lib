import Base from '../../../base/base';

export interface IBaseArticle extends Base.IBase {

    libelle?: string;
    reference?: string;
    tauxTVA?: number;

}

export class BaseArticle extends Base.BaseModel {

    constructor(params: IBaseArticle) {

        super(params);

        this.libelle = params.libelle ? params.libelle : 'Nouvel article';
        this.reference = params.reference ? params.reference : null;

    }

    libelle: string;
    reference: string;

    static instanciateArticleOuGroupe(o: any) {
        if (o.qteArticles) {
            // on créer un groupe d'articles
            return GroupeArticles.instanciate(o);
        } else {
            return Article.instanciate(o);
        }
    }

}

export interface IQteArticles extends IBaseArticle {

    quantite?: number;
    article?: Article;

}

export class QteArticles extends Base.BaseModel {

    constructor(params: IQteArticles) {

        super(params);

        this.quantite = params.quantite ? params.quantite : 0;
        this.article = params.article ? params.article : null;

    }

    quantite: number;
    get total() {
        if (!this.quantite || !this.article || !this.article.prix) {
            console.warn('Impossible de calculer le total...');
            return 0;
        }
        return this.quantite * this.article.prix;
    }

    private _article: Article;
    get article(): Article {
        return this._article;
    }
    set article(a) {
        this._article = Article.instanciate(a);
    }

}

export interface IGroupeArticles extends IBaseArticle {
    qteArticles?: Array<QteArticles>;
}

export class GroupeArticles extends BaseArticle implements IBaseArticle {

    constructor(params: IGroupeArticles) {

        super(params);

        this.qteArticles = params.qteArticles ? params.qteArticles : new Array<QteArticles>();


    }

    private _qteArticles: Array<QteArticles>;
    get qteArticles(): Array<QteArticles> {
        return this._qteArticles;
    }

    set qteArticles(articles) {

        this._qteArticles ? this._qteArticles.length = 0 : this._qteArticles = [];

        if (Array.isArray(articles)) {
            for (var i = 0; i < articles.length; i++) {
                var element = articles[i];
                this._qteArticles.push(QteArticles.instanciate(element));
            }
        } else {
            this._qteArticles.push(QteArticles.instanciate(articles));
        }

    }

    public addQteArticles(q) {
        this._qteArticles.push(QteArticles.instanciate(q));
    }

    get prix() {

        var p = 0;

        for (let i = 0; i < this.qteArticles.length; i++) {
            var q = this.qteArticles[i];
            p += q.total;
        }

        return p;

    }

    get tauxTVA() {

        var totalQte = 0;
        var somme = 0;

        for (let i = 0; i < this.qteArticles.length; i++) {
            var q = this.qteArticles[i];
            totalQte += q.quantite;
            somme += q.article.tauxTVA * q.quantite;
        }

        var tauxPondere = somme / totalQte * 100;
        var tauxArrondi = this.round(tauxPondere);
        return tauxArrondi / 100;

    }

}

export interface IArticle extends IBaseArticle {
    unite?: string;
    tauxTVA?: number;
    prix?: number;
}

export class Article extends BaseArticle implements IArticle {

    constructor(params: IArticle) {

        super(params);
        this.unite = params.unite ? params.unite : null;
        this.prix = params.prix ? params.prix : 0;
        this.tauxTVA = params.tauxTVA ? params.tauxTVA : 0;

    }

    unite: string;
    prix: number;
    tauxTVA: number;

}
