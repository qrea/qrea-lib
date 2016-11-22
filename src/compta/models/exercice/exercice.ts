import Base from '../../../base/base';
import { Journal } from '../journal/journal';

export class Exercice extends Base.BaseModel {

    constructor(params: any) {
    super(params);
    this.dateCloture = params.dateCloture || null;
    this.duree = params.duree || 12; // par défaut exercice de 12 mois
    this.journaux = params.journaux || [];
    }

    // la date de cloture
    dateCloture: Date;

    // durée de l'Exercice
    duree: number;

    // les journaux
    journaux: Journal[];

}