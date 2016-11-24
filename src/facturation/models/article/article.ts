import Base from '../../../base/base';

export interface IArticle extends Base.IBase {

    libelle: string;
    prix: number;
    reference: string;
    tauxTVA: number;

}

export class BaseArticle extends Base.BaseModel {
    
    constructor(params: any){
    
    super(params);

        if(!params.libelle) throw new Error('Le model \'BaseArticle\' requiert un paramètre \'libelle\' non nul');
        this.libelle = params.libelle;
        this.reference = params.reference;

    }

    libelle: string;
    reference: string;

    static instanciateArticleOuGroupe(o: any){
        if(o.qteArticles){
            // on créer un groupe d'articles
            return GroupeArticles.instanciate(o);
        } else {
            return Article.instanciate(o);
        }
    }

}

export class QteArticles extends Base.BaseModel {

    constructor(params: any){

        super(params);

        this.quantite = params.quantite;
        this.article = params.article;

    }

    quantite: number;
    get total(){
        if(!this.quantite || !this.article || !this.article.prix){
            console.warn('Impossible de calculer le total...');
            return 0;
        }
        return this.quantite * this.article.prix;
    }

    private _article: Article;
    get article(): Article {
        return this._article;
    }
    set article(a){
        this._article = Article.instanciate(a);
    }

}

export class GroupeArticles extends BaseArticle implements IArticle {

    constructor(params: any){

        super(params);

        if(!params.qteArticles) throw new Error('Le model \'GroupeArticles\' requiert une propriété \'qteArticles\' valide');

        this.qteArticles = params.qteArticles;

    }

    private _qteArticles: Array<QteArticles>;
    get qteArticles(): Array<QteArticles>{
        return this._qteArticles;
    }

    set qteArticles(articles){

        this._qteArticles ? this._qteArticles.length = 0 : this._qteArticles = [];

        if(Array.isArray(articles)){
            for (var i = 0; i < articles.length; i++) {
            var element = articles[i];
            this._qteArticles.push(QteArticles.instanciate(element));
            }
        } else {
            this._qteArticles.push(QteArticles.instanciate(articles));
        }

    }

    public addQteArticles(q){
        this._qteArticles.push(QteArticles.instanciate(q));
    }

    get prix(){

        var p = 0;

        for (let i = 0; i < this.qteArticles.length; i++) {
            var q = this.qteArticles[i];
            p += q.total;
        }

        return p;

    }

    get tauxTVA(){

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

export class Article extends BaseArticle implements IArticle {

    constructor(params: any) {

        super(params);

        //this.libelle = params.libelle;
        this.unite = params.unite || null;
        this.prix = params.prix;
        this.tauxTVA = params.tauxTVA || 0;
        //this.reference = params.reference || null;

    }

    //libelle: string;
    unite: string;
    prix: number;
    tauxTVA: number;
    //reference: string;

}
