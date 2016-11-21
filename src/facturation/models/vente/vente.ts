import Base from '../../../base/base';
import { Article, IArticle, BaseArticle } from '../article/article';

export class Vente extends Base.BaseModel {

    constructor(params: any) {

        super(params);

        if(!params.article) throw new Error('L\'objet vente requiert une propriété \'article\' valide');
        if(!params.quantite) throw new Error('L\'objet vente requiert une propriété \'quantite\'');

        this.article = params.article;
        this.quantite = params.quantite;
        this.prctRemise = params.prctRemise || null;

        this.calculate();

    }

    private calculate(){

        // si les infos nécessaires au calcul ne sont pas donnée on set tout à 0 et on arrête
        if(!this.article || !this._quantite){

            this._totalHT = 0;
            this._totalTTC = 0;
            this._totalTVA = 0;

            return;

        } else {

            this._totalHT = this.article.prix * this._quantite;

            if(this.prctRemise){
            this._totalHT = this._totalHT * (1 - this.prctRemise);
            }

            this._totalHT = this.round(this._totalHT);

            this._totalTVA = this.round(this._totalHT * this.article.tauxTVA);
            this._totalTTC = this._totalTVA + this._totalHT;

        }        

    }

    // article: IArticle;
    private _article: IArticle;
    get article(): IArticle{
        return this._article;
    }
    set article(a){
        // on instancie un article ou un groupe d'articles
        this._article = BaseArticle.instanciateArticleOuGroupe(a);
    }

    private _quantite: number;
    get quantite(): number {
        return this._quantite;
    }
    set quantite(newQuantite: number){
        this._quantite = newQuantite;
        this.calculate();
    }

    prctRemise: number;

    private _totalHT: number; // calculé
    get totalHT(): number {
        this.calculate();
        return this._totalHT;
    }

    private _totalTTC: number; // calculé
    get totalTTC(): number {
        this.calculate();
        return this._totalTTC;
    }

    private _totalTVA: number; // calculé
    get totalTVA(): number {
        this.calculate();
        return this._totalTVA;
    }

}