import Base from '../../../base/base';
import { Adresse } from '../adresse/adresse';
import { Identification } from '../identification/identification';

export interface IPersonne extends Base.IBase {

    adresse?: Adresse;
    isEntreprise?: boolean;
    numeroTVA?: string;
    telephone?: string;
    email?: string;
    siteInternet?: string;
    fax?: string;
    identification?: Identification;
    isPersonneMorale?: boolean;
    nomComplet?: string;

}

export class Personne extends Base.BaseModel {

    constructor(params: IPersonne = null) {

        super(params);

        this.adresse = params && params.adresse ? params.adresse : new Adresse({}); // TODO: SUPPR OBJET PASSE DANS LINSTANCIATION...
        this.isEntreprise = params && params.isEntreprise ? params.isEntreprise : false;
        this.numeroTVA = params && params.numeroTVA ? params.numeroTVA : null;
        this.telephone = params && params.telephone ? params.telephone : null;
        this.email = params && params.email ? params.email : null;
        this.siteInternet = params && params.siteInternet ? params.siteInternet : null;
        this.fax = params && params.fax ? params.fax : null;
        this.identification = params && params.identification ? params.identification : new Identification();
        this.nomComplet = params && params.nomComplet ? params.nomComplet : null;

    }

    public static instanciatePhysiqueOuMorale(newPersonne: any) {

        if (!newPersonne || !newPersonne.denominationSociale) {
            // on instancie une personne physique
            return PersonnePhysique.instanciate(newPersonne);
        } else {
            return PersonneMorale.instanciate(newPersonne);
        }

    }

    private _adresse: Adresse;
    get adresse(): Adresse {
        return this._adresse;
    }
    set adresse(a) {
        this._adresse = Adresse.instanciate(a);
    }

    isEntreprise: boolean;
    numeroTVA: string;
    telephone: string;
    email: string;
    siteInternet: string;
    fax: string;
    identification: Identification;
    nomComplet: string;


}

export interface IPersonnePhysique extends IPersonne {

    civilite?: string;
    nom?: string;
    prenom?: string;
    nomCommercial?: string;

}

export class PersonnePhysique extends Personne {

    constructor(params: IPersonnePhysique = null) {

        super(params);

        this.civilite = params ? params.civilite : null;
        this.nom = params ? params.nom : null;
        this.prenom = params ? params.prenom : null;
        this.nomCommercial = params ? params.nomCommercial : null;

    }

    civilite: string;
    nom: string;
    prenom: string;
    nomCommercial: string;

    private _nomComplet: string;
    get nomComplet(): string {

        if (this._nomComplet) return this._nomComplet;

        let nom = this.civilite ? this.civilite + ' ' : '';
        nom += this.nom ? this.nom.toUpperCase() : '';
        nom += ' ';
        nom += this.prenom ? this.prenom.toUpperCase() : '';

        return nom;

    }

    set nomComplet(v: string) {
        this._nomComplet = v;
    }

}

export interface IPersonneMorale extends IPersonne {

    forme?: string;
    denominationSociale?: string;
    capitalSocial?: number;
    isCapitalVariable?: boolean;

}

export class PersonneMorale extends Personne {

    constructor(params: IPersonneMorale = null) {

        super(params);

        this.forme = params ? params.forme : null;
        this.denominationSociale = params ? params.denominationSociale : null;
        this.capitalSocial = params ? params.capitalSocial : null;
        this.isCapitalVariable = params ? params.isCapitalVariable : false;

    }

    forme: string;
    denominationSociale: string;
    capitalSocial: number;
    isCapitalVariable: boolean;


    private _nomComplet: string;
    public get nomComplet(): string {

        if (this._nomComplet) return this._nomComplet;

        let nom = this.forme.toUpperCase() + ' ' + this.denominationSociale.toUpperCase();
        return nom;
        // return this._nomComplet;
    }

    public set nomComplet(v: string) {
        this._nomComplet = v;
    }

}
