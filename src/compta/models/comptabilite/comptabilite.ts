import Base from '../../../base/base'; 
import { Entreprise } from '../../../core/models/models';
import { Exercice } from '../exercice/exercice';

export class Comptabilite extends Base.BaseModel {

    constructor(params: any) {

        super(params);
        this.entreprise = params.entreprise || null;
        this.exercices = params.exercices || null;
        
    }

    entreprise: Entreprise;
    exercices: Exercice[];

}