import Base from '../../../base/base';

export class Reglement extends Base.BaseModel {

    constructor(params: any) {

        super(params);

        //this.type = params.type;
        this.delai = params.delai;
        //this.moyen = params.moyen;
        this.montant = params.montant;
        this.pourcentage = params.pourcentage;
        this.finDeMois = params.finDeMois;
        this.paye = params.paye;

    }

    delai: number; //en jours
    montant: number;
    pourcentage: number;
    finDeMois: boolean;
    paye: boolean;

}