import Base from '../../../base/base';
import { Adresse } from '../adresse/adresse';
import { Identification } from '../identification/identification';
export declare abstract class Personne extends Base.BaseModel {
    constructor(params: any);
    static instanciatePhysiqueOuMorale(newPersonne: any): any;
    private _adresse;
    adresse: Adresse;
    isEntreprise: boolean;
    numeroTVA: string;
    telephone: string;
    email: string;
    siteInternet: string;
    fax: string;
    identification: Identification;
}
export declare class PersonnePhysique extends Personne {
    constructor(params: any);
    civilite: string;
    nom: string;
    prenom: string;
    nomCommercial: string;
}
export declare class PersonneMorale extends Personne {
    constructor(params: any);
    forme: string;
    denominationSociale: string;
    capitalSocial: number;
    isCapitalVariable: string;
}
