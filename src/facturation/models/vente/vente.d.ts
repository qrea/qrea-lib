import Base from '../../../base/base';
import { IArticle } from '../article/article';
export declare class Vente extends Base.BaseModel {
    constructor(params: any);
    private calculate();
    private _article;
    article: IArticle;
    private _quantite;
    quantite: number;
    prctRemise: number;
    private _totalHT;
    totalHT: number;
    private _totalTTC;
    totalTTC: number;
    private _totalTVA;
    totalTVA: number;
}
