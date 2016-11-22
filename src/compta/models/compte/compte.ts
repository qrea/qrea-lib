import Base from '../../../base/base';

export class Compte extends Base.BaseModel {

    constructor(params: any) {

    // constructor parent
    super(params);
    this.compteLib = params.compteLib || null;
    this.compteNum = params.compteNum || null;

    }

    // le libellé du compte
    compteLib: string;

    // c'est l'identifiant unique du compte
    compteNum: string;

}
