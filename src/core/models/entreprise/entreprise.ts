import Base from '../../../base/base';
import { Personne, PersonnePhysique, PersonneMorale } from '../personne/personne';
import { Identification } from '../identification/identification';

export interface IEntreprise {

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

}

export class Entreprise extends Base.BaseModel implements IEntreprise {

    constructor(params: IEntreprise = null) {

        super(params);

        if(! params || !params.personne) {
            // on créer une personne physique par défaut
            let personne = new PersonnePhysique({});
            this.personne = personne;
        } else {
            this.personne = params.personne;            
        }

        if(!params || !params.identification) {
            let identification = new Identification({});
            this.identification = identification;
        } else {
            this.identification = params.identification;
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
        this._personne = Personne.instanciatePhysiqueOuMorale(p);
    }

    private _identification: Identification;
    get identification(): Identification{
        return this._identification;
    }
    set identification(i){
        this._identification = Identification.instanciate(i);
    }

}