import Base from '../../../base/base';

export interface IAdresse extends Base.IBase {

    nom?: string;
    ligne1?: string;
    ligne2?: string;
    cp?: string;
    ville?: string;
    pays?: string;

}

export class Adresse extends Base.BaseModel implements IAdresse {

    constructor(params: IAdresse) {

        super(params);

        this.nom = params ? params.nom : null;
        this.ligne1 = params ? params.ligne1 : null;
        this.ligne2 = params ? params.ligne2 : null;
        this.cp = params ? params.cp : null;
        this.ville = params ? params.ville : null;
        this.pays = params ? params.pays : null;

    }

    nom: string;
    ligne1: string;
    ligne2: string;
    cp: string;
    ville: string;
    pays: string;

}