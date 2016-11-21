import Base from '../../../base/base';
import { Adresse } from '../adresse/adresse';
import { Identification } from '../identification/identification';

export abstract class Personne extends Base.BaseModel {

    constructor(params: any) {

    super(params);

    this.adresse = params.adresse;
    this.isEntreprise = params.isEntreprise || false;
    this.numeroTVA = params.numeroTVA || null;
    this.telephone = params.telephone || null;
    this.email = params.email || null;
    this.siteInternet = params.siteInternet || null;
    this.fax = params.fax || null;
    this.identification = params.identification || null;        

    }

    public static instanciatePhysiqueOuMorale(newPersonne){

    if(!newPersonne.denominationSociale){
        // on instancie une personne physique
        return PersonnePhysique.instanciate(newPersonne);
    } else {
        return PersonneMorale.instanciate(newPersonne);
    }

    }

    private _adresse: Adresse;
    get adresse(): Adresse{
        return this._adresse;
    }
    set adresse(a){
        this._adresse = Adresse.instanciate(a);
    }

    isEntreprise: boolean;
    numeroTVA: string;
    telephone: string;
    email: string;
    siteInternet: string;
    fax: string;
    identification: Identification;      

}

export class PersonnePhysique extends Personne {

    constructor(params: any) {

    super(params);

    this.civilite = params.civilite || null;
    this.nom = params.nom || null;
    this.prenom = params.prenom || null;
    this.nomCommercial = params.nomCommercial || null;

    }

    civilite: string;
    nom: string;
    prenom: string;
    nomCommercial: string;

}

export class PersonneMorale extends Personne {

    constructor(params: any) {

    super(params);

    this.forme = params.forme;
    this.denominationSociale = params.denominationSociale;
    this.capitalSocial = params.capitalSocial || null;
    this.isCapitalVariable = params.isCapitalVariable || false;

    }

    forme: string;
    denominationSociale: string;
    capitalSocial: number;
    isCapitalVariable: string;

}
