import Base from '../../../base/base';
import { Journal } from '../journal/journal';
import { Compte } from '../compte/compte';
import { ISoldeFilter } from '../../filters/filters';

export interface IExerciceParams {
    cloture: Date;
    duree: number;
    journaux: Journal[];
}

export class Exercice extends Base.BaseModel implements IExerciceParams {

    constructor(params: IExerciceParams) {
        super(params);
        this.cloture = params.cloture || null;
        this.duree = params.duree || 12; // par défaut exercice de 12 mois
        this.journaux = params.journaux || new Array<Journal>();
    }

    public getJournalByCode(code: string){
        let journal: Journal = null;
        this.journaux.forEach((j: Journal) => {
            if(j.code === code) journal = j;
        });
        return journal;
    }

    public getSolde(c: string, filter: ISoldeFilter = null){

        let numero: string = <string>c;
        let solde = 0;
        this.journaux.forEach(j => {
            solde += j.getSolde(c, filter);
        });
        return solde;

    }

    // la date de cloture
    cloture: Date;

    // durée de l'Exercice
    duree: number;

    // les journaux
    journaux: Journal[];

}