import Base from '../../../base/base';

export interface ICompte {
    libelle: string;
    numero: string;
}

export class Compte extends Base.BaseModel implements ICompte {

    constructor(params: ICompte) {

        // constructor parent
        super(params);
        this.libelle = params.libelle || null;
        this.numero = params.numero || null;

    }

    // le libellé du compte
    libelle: string;

    // c'est l'identifiant unique du compte
    numero: string;

}
