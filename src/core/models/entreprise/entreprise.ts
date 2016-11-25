import Base from '../../../base/base';
import { Personne, PersonnePhysique, PersonneMorale } from '../personne/personne';
import { Identification } from '../identification/identification';
import { Logo } from '../logo/logo';

export interface IEntreprise extends Base.IBase {

    personne?: PersonneMorale | PersonnePhysique;
    identification?: Identification;
    isAdherentCGA?: boolean;
    isExonere?: boolean;
    isAssujettiTVA?: boolean;
    isFranchiseEnBase?: boolean;
    isRegimeMargeBeneficiaire?: boolean;
    isAutoliquidation?: boolean;
    numeroTVA?: string;
    capital?: number;
    isCapitalVariable?: boolean;
    tauxPenalitesReglement?: number;
    conditionsEscompte?: string;
    mentionsParticulieres?: string;    
    modeReglementDefaut?: string;
    logo?: Logo;

}

export class Entreprise extends Base.BaseModel implements IEntreprise {

    constructor(params: IEntreprise = null) {

        super(params);

        if(! params || !params.personne) {
            // on créer une personne physique par défaut
            let personne = new PersonnePhysique();
            this.personne = personne;
        } else {
            this.personne = params.personne;            
        }

        if(!params || !params.identification) {
            this.identification = new Identification();
        } else {
            this.identification = params.identification;
        }

        if (!params || !params.logo) {
            this.logo = new Logo();
        } else {
            this.logo = params.logo;
        }

        this.isAdherentCGA = params ? params.isAdherentCGA : null;
        this.isExonere = params ? params.isExonere : null;
        this.isAssujettiTVA = params ? params.isAssujettiTVA : null;
        this.isFranchiseEnBase = params ? params.isFranchiseEnBase : null;
        this.isRegimeMargeBeneficiaire = params ? params.isRegimeMargeBeneficiaire : null;
        this.isAutoliquidation = params ? params.isAutoliquidation : null;
        
        this.numeroTVA = params ? params.numeroTVA : null;
        this.capital = params ? params.capital : null;
        this.isCapitalVariable = params ? params.isCapitalVariable : null;
        this.tauxPenalitesReglement = params ? params.tauxPenalitesReglement : null;
        this.conditionsEscompte = params ? params.conditionsEscompte : null;
        this.mentionsParticulieres = params ? params.mentionsParticulieres : null;
        this.modeReglementDefaut = params ? params.modeReglementDefaut : null;

    }
  
    isAdherentCGA: boolean;
    isExonere: boolean;
    isAssujettiTVA: boolean;
    isFranchiseEnBase: boolean;
    isRegimeMargeBeneficiaire: boolean;
    isAutoliquidation: boolean;
    numeroTVA: string;
    capital: number;
    isCapitalVariable: boolean;
    tauxPenalitesReglement: number;
    conditionsEscompte: string;
    mentionsParticulieres: string;    
    modeReglementDefaut: string;

    private _personne: PersonneMorale|PersonnePhysique;
    // on peut avoir une personne physique ou morale
    get personne(): PersonneMorale|PersonnePhysique {
        return this._personne;
    }
    set personne(p){

        if(p['getName'] && ['PersonneMorale', 'PersonnePhysique'].indexOf(p.getName()) > -1){
            this._personne = p;
        } else {
            this._personne = Personne.instanciatePhysiqueOuMorale(p);
        }

    }

    private _identification: Identification;
    get identification(): Identification{
        return this._identification;
    }
    set identification(i){
        this._identification = Identification.instanciate(i);
    }

    private _logo: Logo;
    get logo(): Logo {
        return this._logo;
    }
    set logo(l) {
        this._logo = Logo.instanciate(l);
    }

    public get isPersonneMorale(): boolean {

        if (this.personne.getName() === 'PersonneMorale') { return true; }
        return false;
        
    }

    public set isPersonneMorale(value) {

        if (this.personne.getName() === 'PersonneMorale' && value === false) {
            this.personne = new PersonnePhysique(this.personne);            
        } else if(this.personne.getName() === 'PersonnePhysique' && value === true) {
            this.personne = new PersonneMorale(this.personne);
        }

    }

    public get nomComplet(): string {

        let s = '';
        if(this.isPersonneMorale){
            const p: PersonneMorale = <PersonneMorale>this.personne;
            s += p.denominationSociale || '' + ' ' + p.forme || '';
        } else {
            const p: PersonnePhysique = <PersonnePhysique>this.personne;
            s += p.nomCommercial || ((p.prenom || '') + ' ' + (p.nom || ''));
        }

        return s;

    }

    public get nomCompletCapital(): string {

        let s = this.nomComplet;

        if(this.isPersonneMorale){

            s += ' au capital ';
            if(this.isCapitalVariable){
                s += 'variable minimum ';
            }
            s += 'de ' + (this.capital || '?') + ' €';

        }

        return s;

    }
}