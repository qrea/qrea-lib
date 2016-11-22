import Base from '../../../base/base';
export declare class Reglement extends Base.BaseModel {
    constructor(params: any);
    delai: number;
    montant: number;
    pourcentage: number;
    finDeMois: boolean;
    paye: boolean;
}
