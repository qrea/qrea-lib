export interface ICalculette {
    //calculer: any; // la fonction qui appel les calculs
    //context: any;
}

export interface IParamsCalculette {
    //context: any;
}

import Base from '../../../base/base';

export abstract class BaseCalculette extends Base.BaseModel {

    constructor(params: any){
        super(params);
    }

}