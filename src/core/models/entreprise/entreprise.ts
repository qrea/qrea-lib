import Base from '../../../base/base';
import { Personne } from '../personne/personne';
import { Identification } from '../identification/identification';

export class Entreprise extends Base.BaseModel {

    constructor(params: any) {

        super(params);

        if(!params.personne) throw new Error('Le model \'Entreprise\' requiert une propriété \'personne\' valide');

        this.personne = params.personne;
        this.isAdherentCGA = params.isAdherentCGA;
        this.isExonere = params.isExonere;
        this.isAssujettiTVA = params.isAssujettiTVA;
        this.isFranchiseEnBase = params.isFranchiseEnBase;
        this.isRegimeMargeBeneficiaire = params.isRegimeMargeBeneficiaire;
        this.isAutoliquidation = params.isAutoliquidation;
        this.identification = params.identification;
        this.numeroTVA = params.numeroTVA;
        this.capital = params.capital;
        this.isCapitalVariable = params.isCapitalVariable;
        this.tauxPenalitesReglement = params.tauxPenalitesReglement;
        this.conditionsEscompte = params.conditionsEscompte;
        this.mentionsParticulieres = params.mentionsParticulieres;
        this.modeReglementDefaut = params.modeReglementDefaut;

    }

    // personne: Personne;
    isAdherentCGA: boolean;
    isExonere: boolean;
    isAssujettiTVA: boolean;
    isFranchiseEnBase: boolean;
    isRegimeMargeBeneficiaire: boolean;
    isAutoliquidation: boolean;
    // identification: Identification;
    numeroTVA: string;
    capital: number;
    isCapitalVariable: boolean;
    tauxPenalitesReglement: number;
    conditionsEscompte: string;
    mentionsParticulieres: string;
    
    modeReglementDefaut: string;

    private _personne: Personne;
    // on peut avoir une personne physique ou morale
    get personne(): Personne{
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