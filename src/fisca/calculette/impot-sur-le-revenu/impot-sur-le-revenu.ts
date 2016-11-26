import { BaseCalculette, IParamsCalculette, ICalculette } from '../calculette';

export interface IParamsImpotRevenu extends IParamsCalculette {

}

export class ImpotRevenuCalculette extends BaseCalculette implements ICalculette {
    
    constructor(params: IParamsImpotRevenu){
        super(params);
    }

    calculer(revenuNetGlobal: number, nbParts: number): number {
        let res = 0;

        let q = revenuNetGlobal / nbParts;

        // application de la formule de calculer

        // plafonnement du quotient familial

        // impot net

        // retour des résultats

        return 0;
    }

    context: IParamsImpotRevenu;

}