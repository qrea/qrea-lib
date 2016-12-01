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

     get description(): string {

        let d = '';
        if(this.revenuNet < 0){
            d += 'Déficit foncier ' + this.revenuNet;
        } else {
            d += 'Revenu foncier ' + this.revenuNet;
        }
        
        return d;

    }

    categorie: string = 'Revenus fonciers';
    categorieShort: string = 'RF';
    
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

    private _revenuBrut : number = 0;
    /**
     * Loyer bruts perçus
     */
    public get revenuBrut() : number {
        return this._revenuBrut;
    }
    public set revenuBrut(v : number) {
        this._revenuBrut = v;
        if(this._revenuBrut > CONSTANTES_RF_2015['PLAFOND_MICRO']){
            this.regime = regimesFonciers.reel;
        }
        this.calcuerRevenuNet();
    }
    
    /**
     * Abattement calculé en €
     */
    get abattement(): number {
        if(this.regime === regimesFonciers.micro) {
            return Math.round(this.revenuBrut * CONSTANTES_RF_2015['ABATTEMENT_MICRO_FONCIER'])
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

            this.revenuNet = Math.round(this.revenuBrut * (1 - CONSTANTES_RF_2015['ABATTEMENT_MICRO_FONCIER']));

        } else {

            let r = this.revenuBrut;
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