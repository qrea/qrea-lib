import Base from '../../../base/base'; 
import { Entreprise } from '../../../core/models/models';
import { Exercice } from '../exercice/exercice';

export interface IComptabiliteParams {
    entreprise: Entreprise;
    exercices: Exercice[];
};

export class Comptabilite extends Base.BaseModel {

    constructor(params: IComptabiliteParams = null) {

        super(params);
        this.entreprise = params && params.entreprise || null;
        this.exercices = params && params.exercices || new Array<Exercice>();
        
    }

    entreprise: Entreprise;
    exercices: Exercice[];

}