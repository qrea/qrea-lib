import * as RevenusCategoriels from '../revenus-categoriels';

export const CONSTANTES_TS_2015 = {
    MINI_ABATTEMENT: 426,
    MAXI_ABATTEMENT: 12170,
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

    get description(): string {

        let d = '';
        if(this.traitementsSalairesPrincipal > 0) d += 'Salaires ' + this.traitementsSalairesPrincipal;
        if(this.traitementsSalairesConjoint > 0) d += 'Salaires ' + this.traitementsSalairesConjoint;
        if(this.traitementsSalairesAutres > 0) d += 'Salaires ' + this.traitementsSalairesAutres;
        if(this.pensionsRetraitePrincipal > 0) d += 'Pension ' + this.pensionsRetraitePrincipal;
        if(this.pensionsRetraiteConjoint > 0) d += 'Pension ' + this.pensionsRetraiteConjoint;
        if(this.pensionsRetraiteAutres > 0) d += 'Pension ' + this.pensionsRetraiteAutres;
        return d;

    }

    categorie: string = 'Traitements et salaires';
    categorieShort: string = 'TS';
    
    private _traitementsSalairesPrincipal : number = 0;
    /**
     * Traitements et salaire du contribuable principal
     */
    public get traitementsSalairesPrincipal() : number {
        return this._traitementsSalairesPrincipal;
    }
    public set traitementsSalairesPrincipal(v : number) {
        this._traitementsSalairesPrincipal = v;
        // console.log('traitementsSalairesPrincipal=%s', this._traitementsSalairesPrincipal);
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
        // console.log('pension', v);
        this.calculerRevenuNetAutres();
    }
    
    private calculerRevenuNetPrincipal(){

        // console.log('calculerRevenuNetPrincipal()');

        this.revenuNetPrincipal =
            this.calculerNetImposableTraitementsSalaires(this.traitementsSalairesPrincipal, this.fraisReelPrincipal)
            + this.calculetNetImposablePensions(this.pensionsRetraitePrincipal);

        // console.log('revenuNetPrincipal=', this.revenuNetPrincipal);
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

        // console.log('--->', this.revenuNetAutres, this.revenuNetConjoint, this.revenuNetPrincipal);
        const total = this.revenuNetAutres + this.revenuNetConjoint + this.revenuNetPrincipal;
        // console.log('total revenu traitement et salaire ', total); 
        this.revenuNet = total;
    }

    private calculerNetImposableTraitementsSalaires(brut: number, fraisReel: number = 0){
        
        // console.log('calculerNetImposableTraitementsSalaires(%s, %s: number = 0', brut, fraisReel);

        if(brut === 0) return 0;

        let abatt = brut * CONSTANTES_TS_2015['ABATTEMENT'];
        
        if(abatt > CONSTANTES_TS_2015['MAXI_ABATTEMENT']){
            abatt = CONSTANTES_TS_2015['MAXI_ABATTEMENT'];
        } else if(abatt < CONSTANTES_TS_2015['MINI_ABATTEMENT']){
            abatt = CONSTANTES_TS_2015['MINI_ABATTEMENT'];
        }
        
        // console.log('abatt=', abatt);

        abatt = abatt > fraisReel ? abatt : fraisReel;

        // console.log('abatt retenu=', abatt);

        let net = brut - abatt;
        
        // console.log('net=', net);

        return net;

    }

    private calculetNetImposablePensions(brut: number) {

        if(brut === 0) return 0;

        let abatt = brut * CONSTANTES_PENSIONS_2015['ABATTEMENT'];

        if(abatt > CONSTANTES_PENSIONS_2015['MAXI_ABATTEMENT']){
            abatt = CONSTANTES_PENSIONS_2015['MAXI_ABATTEMENT'];
        } else if(abatt < CONSTANTES_PENSIONS_2015['MINI_ABATTEMENT']){
            abatt = CONSTANTES_PENSIONS_2015['MINI_ABATTEMENT'];
        }

        let net = brut - abatt;
        
        // console.log('net=', net);

        return net;


    }

}