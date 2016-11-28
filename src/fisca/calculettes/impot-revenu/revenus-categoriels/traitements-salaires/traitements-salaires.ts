import * as RevenusCategoriels from '../revenus-categoriels';

export const CONSTANTES_TS_2015 = {
    MINI_ABATTEMENT: 426,
    MAXI_ABATTEMENT: 937,
    ABATTEMENT: 0.1
}

export const CONSTANTES_PENSIONS_2015 = {
    MINI_ABATTEMENT: 379,
    MAXI_ABATTEMENT: 3711,
    ABATTEMENT: 0.1
}

export class TraitementsSalaires extends RevenusCategoriels.RevenuCategoriel {

    constructor(){
        super();
    }
    
    private _traitementsSalairesPrincipal : number = 0;
    /**
     * Traitements et salaire du contribuable principal
     */
    public get traitementsSalairesPrincipal() : number {
        return this._traitementsSalairesPrincipal;
    }
    public set traitementsSalairesPrincipal(v : number) {
        this._traitementsSalairesPrincipal = v;
        this.calculerRevenuNetPrincipal();
    }

    private _fraisReelPrincipal : number = 0;
    public get fraisReelPrincipal() : number {
        return this._fraisReelPrincipal;
    }
    public set fraisReelPrincipal(v : number) {
        this._fraisReelPrincipal = v;
        this.calculerRevenuNetPrincipal();
    }
    
    private _traitementsSalairesConjoint : number = 0;
    /**
     * Traitements et salaires du conjoint
     */
    public get traitementsSalairesConjoint() : number {
        return this._traitementsSalairesConjoint;
    }
    public set traitementsSalairesConjoint(v : number) {
        this._traitementsSalairesConjoint = v;
        this.calculerRevenuNetConjoint();
    }
    
    private _fraisReelConjoint : number = 0;
    public get fraisReelConjoint() : number {
        return this._fraisReelConjoint;
    }
    public set fraisReelConjoint(v : number) {
        this._fraisReelConjoint = v;
        this.calculerRevenuNetConjoint();
    }    
    
    private _traitementsSalairesAutres : number = 0;
    /**
     * Traitements et salaires des autres membres du foyer fiscal
     */
    public get traitementsSalairesAutres() : number {
        return this._traitementsSalairesAutres;
    }
    public set traitementsSalairesAutres(v : number) {
        this._traitementsSalairesAutres = v;
        this.calculerRevenuNetAutres();
    }
    
    private _fraisReelAutres : number = 0;
    public get fraisReelAutres() : number {
        return this._fraisReelAutres;
    }
    public set fraisReelAutres(v : number) {
        this._fraisReelAutres = v;
        this.calculerRevenuNetAutres();        
    }    
    
    private _pensionsRetraitePrincipal : number = 0;
    /**
     * Pension du contribuable principal
     */
    public get pensionsRetraitePrincipal() : number {
        return this._pensionsRetraitePrincipal;
    }
    public set pensionsRetraitePrincipal(v : number) {
        this._pensionsRetraitePrincipal = v;
        this.calculerRevenuNetPrincipal();
    }    
    
    private _pensionsRetraiteConjoint : number = 0;
    /**
     * Pension du conjoint
     */
    public get pensionsRetraiteConjoint() : number {
        return this._pensionsRetraiteConjoint;
    }
    public set pensionsRetraiteConjoint(v : number) {
        this._pensionsRetraiteConjoint = v;
        this.calculerRevenuNetConjoint();
    }
    
    private _pensionsRetraiteAutres : number = 0;
    /**
     * Pension des autres membres du foyer fiscal
     */
    public get pensionsRetraiteAutres() : number {
        return this._pensionsRetraiteAutres;
    }
    public set pensionsRetraiteAutres(v : number) {
        this._pensionsRetraiteAutres = v;
        this.calculerRevenuNetAutres();
    }
    
    private calculerRevenuNetPrincipal(){

        this.revenuNetPrincipal =
            this.calculerNetImposableTraitementsSalaires(this.traitementsSalairesPrincipal, this.fraisReelPrincipal)
            + this.calculetNetImposablePensions(this.pensionsRetraitePrincipal);
        this.calculerRevenuNet();

    }

    private calculerRevenuNetConjoint(){

        this.revenuNetConjoint =
            this.calculerNetImposableTraitementsSalaires(this.traitementsSalairesConjoint, this.fraisReelConjoint)
            + this.calculetNetImposablePensions(this.pensionsRetraiteConjoint);
        this.calculerRevenuNet();

    }

    private calculerRevenuNetAutres(){

        this.revenuNetAutres = 
            this.calculerNetImposableTraitementsSalaires(this.traitementsSalairesAutres, this.fraisReelAutres)
            + this.calculetNetImposablePensions(this.pensionsRetraiteAutres);
        this.calculerRevenuNet();

    }

    private calculerRevenuNet(){

        this.revenuNet =
            this.revenuNetAutres
            + this.revenuNetConjoint
            + this.revenuNetPrincipal;
            
    }

    private calculerNetImposableTraitementsSalaires(brut: number, fraisReel: number = 0){
        
        let abatt = brut * CONSTANTES_TS_2015['ABATTEMENT'];
        
        if(abatt > CONSTANTES_TS_2015['MAXI_ABATTEMENT']){
            abatt = CONSTANTES_TS_2015['MAXI_ABATTEMENT'];
        } else if(abatt < CONSTANTES_TS_2015['MINI_ABATTEMENT']){
            abatt = CONSTANTES_TS_2015['MINI_ABATTEMENT'];
        }
        
        abatt = abatt > fraisReel ? abatt : fraisReel;

        return brut - abatt;

    }

    private calculetNetImposablePensions(brut: number) {

        let abatt = brut * CONSTANTES_PENSIONS_2015['ABATTEMENT'];

        if(abatt > CONSTANTES_PENSIONS_2015['MAXI_ABATTEMENT']){
            abatt = CONSTANTES_PENSIONS_2015['MAXI_ABATTEMENT'];
        } else if(abatt < CONSTANTES_PENSIONS_2015['MINI_ABATTEMENT']){
            abatt = CONSTANTES_PENSIONS_2015['MINI_ABATTEMENT'];
        }

        return brut - abatt;

    }

}