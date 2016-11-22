import Base from '../../../base/base';
export declare class Adresse extends Base.BaseModel {
    constructor(params: any);
    nom: string;
    ligne1: string;
    ligne2: string;
    cp: string;
    ville: string;
    pays: string;
}
