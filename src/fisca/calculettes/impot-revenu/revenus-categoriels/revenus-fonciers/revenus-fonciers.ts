import * as RevenusCategoriels from '../revenus-categoriels';

export const CONSTANTES_RF_2015 = {
    MAXI_DEFICIT_IMPUTABLE: 10700,
    ABATTEMENT_MICRO_FONCIER: 0.3,
    PLAFOND_MICRO: 15300
}

export enum regimesFonciers {
    micro,
    reel
}

export class RevenusFonciers extends RevenusCategoriels.RevenuCategoriel {
    
    private _regime : regimesFonciers = 0;
    /**
     * Régime
     */
    public get regime() : regimesFonciers {
        return this._regime;
    }
    public set regime(v : regimesFonciers) {
        this._regime = v;
        this.calcuerRevenuNet();
    }

    private _loyersBruts : number = 0;
    /**
     * Loyer bruts perçus
     */
    public get loyersBruts() : number {
        return this._loyersBruts;
    }
    public set loyersBruts(v : number) {
        this._loyersBruts = v;
        if(this._loyersBruts > CONSTANTES_RF_2015['PLAFOND_MICRO']){
            this.regime = regimesFonciers.reel;
        }
        this.calcuerRevenuNet();
    }
    
    /**
     * Abattement calculé en €
     */
    get abattement(): number {
        if(this.regime === regimesFonciers.micro) {
            return Math.round(this.loyersBruts * CONSTANTES_RF_2015['ABATTEMENT_MICRO_FONCIER'])
        } else {
            return 0;
        }
    }

    private _interetsEmprunt : number = 0;
    /**
     * Intérêts d'emprunt payé
     */
    public get interetsEmprunt() : number {
        return this._interetsEmprunt;
    }
    public set interetsEmprunt(v : number) {
        this._interetsEmprunt = v;
        this.calcuerRevenuNet();
    }
    
    private _chargesDeductibles : number = 0;
    /**
     * Charges déductibles
     */
    public get chargesDeductibles() : number {
        return this._chargesDeductibles;
    }
    public set chargesDeductibles(v : number) {
        this._chargesDeductibles = v;
        this.calcuerRevenuNet();
    }
    
    private _travaux : number = 0;
    /**
     * Travaux payés
     */
    public get travaux() : number {
        return this._travaux;
    }
    public set travaux(v : number) {
        this._travaux = v;
        this.calcuerRevenuNet();
    }   

    private _deficitReportable: number = 0;
    get deficitReportable(): number {
        return this._deficitReportable;
    }

    private _interetsEmpruntReportable: number = 0;
    get interetsEmpruntReportable(): number {
        return this._interetsEmpruntReportable;
    }

    private calcuerRevenuNet(){
        
        if(this.regime === regimesFonciers.micro){

            this.revenuNet = Math.round(this.loyersBruts * (1 - CONSTANTES_RF_2015['ABATTEMENT_MICRO_FONCIER']));

        } else {

            let r = this.loyersBruts;
            r -= this.interetsEmprunt;
            
            if(r < 0) {
                this._interetsEmpruntReportable = Math.abs(r);
                r = 0;
            } else {
                this._interetsEmpruntReportable = 0;
            }

            r -= this.chargesDeductibles;
            r -= this.travaux;

            if(r < -10700) {
                this._deficitReportable = Math.abs(r) - 10700;
                r = -10700;
            } else {
                this._deficitReportable = 0;
            }

            this.revenuNet = r;

        }
        
    }

    constructor(){
        super();
    }

}