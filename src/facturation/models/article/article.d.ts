import Base from '../../../base/base';
export interface IArticle {
    libelle: string;
    prix: number;
    reference: string;
    tauxTVA: number;
}
export declare class BaseArticle extends Base.BaseModel {
    constructor(params: any);
    libelle: string;
    reference: string;
    static instanciateArticleOuGroupe(o: any): any;
}
export declare class QteArticles extends Base.BaseModel {
    constructor(params: any);
    quantite: number;
    total: number;
    private _article;
    article: Article;
}
export declare class GroupeArticles extends BaseArticle implements IArticle {
    constructor(params: any);
    private _qteArticles;
    qteArticles: Array<QteArticles>;
    addQteArticles(q: any): void;
    prix: number;
    tauxTVA: number;
}
export declare class Article extends BaseArticle implements IArticle {
    constructor(params: any);
    unite: string;
    prix: number;
    tauxTVA: number;
}
