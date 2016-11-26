import { ImpotRevenuCalculette } from './impot-revenu/impot-revenu';

export interface ICalculette {
    calculer: any; // la fonction qui appel les calculs
    context: any;
}

export interface IParamsCalculette {
    context: any;
}

export abstract class BaseCalculette {

    constructor(params: any){

    }

}