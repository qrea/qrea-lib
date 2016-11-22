import Base from '../../../base/base';
import { Personne } from '../personne/personne';
import { Identification } from '../identification/identification';
export declare class Entreprise extends Base.BaseModel {
    constructor(params: any);
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
    private _personne;
    personne: Personne;
    private _identification;
    identification: Identification;
}
