import { BaseCalculette, IParamsCalculette, ICalculette } from '../base/base';

import * as RevenusCategoriels from './revenus-categoriels/revenus-categoriels';
export { RevenusCategoriels };

export interface IParamsImpotRevenu extends IParamsCalculette {
    millesime: string;
    couple?: boolean;
    revenuNetGlobal?: number;
    nbEnfants?: number;
}

export interface IConstantesCalcul {
    PLAFOND_QUOTIENT_FAMILIAL: number,
    BAREME_IR: any,
    PLAFOND_DECOTE_CELIBATAIRE: number,
    PLAFOND_DECOTE_COUPLE: number
}

const DICTIONNAIRE_CONSTANTES_2015: IConstantesCalcul = {
    PLAFOND_QUOTIENT_FAMILIAL: 1510,
    PLAFOND_DECOTE_CELIBATAIRE: 1165,
    PLAFOND_DECOTE_COUPLE: 1920,
    BAREME_IR: [
        {
            PLAFOND: 9700,
            TAUX: 0
        },
        {
            PLAFOND: 26791,
            TAUX: 0.14
        },
        {
            PLAFOND: 71826,
            TAUX: 0.3
        },
        {
            PLAFOND: 152108,
            TAUX: 0.41
        },
        {
            PLAFOND: -1,
            TAUX: 0.45
        }
    ]         
}

export const DICTIONNAIRE_CONSTANTES = {
    "2015" : DICTIONNAIRE_CONSTANTES_2015
}

export class ImpotRevenuCalculette extends BaseCalculette implements ICalculette {
    
    private _revenuNetGlobal:number = 0;
    /**
     * Le revenu net global
     */
    get revenuNetGlobal(): number {
        return this._revenuNetGlobal;
    }

    set revenuNetGlobal(value: number) {
        this._revenuNetGlobal = value;
        this.calculer();
    }
    
    /**
    * Le nombre de parts du foyer fiscal
    */
    private nbParts : number = 1;
    
    private _couple : boolean = false;
    /**
     * Couple ?
     */
    public get couple() : boolean {
        return this._couple;
    }
    public set couple(v : boolean) {
        this._couple = v;
        this.impotBrut = this.calculerImpotBrut();
        this.calculer();       
    }    

    private _nbEnfants : number;
    /**
     * Le nombre d'enfants du foyer fiscal
     */
    public get nbEnfants() : number {
        return this._nbEnfants;
    }
    public set nbEnfants(v : number) {
        this._nbEnfants = v;        
        this.calculer();
    }
    
    /**
     * Calcul le nombre de parts du foyer fiscal
     * 
     * @private
     * 
     * @memberOf ImpotRevenuCalculette
     */
    private calculerNbParts(){

        if(this._nbEnfants <= 2){
            this.nbParts = this._nbEnfants * 0.5;
        } else {
            this.nbParts = 1 + (this.nbEnfants - 2) * 1;
        }

        this.nbParts += this.couple ? 2 : 1;

    }

    /**
     * La liste des revenus entrés dans la calculette
     * 
     * @type {Array<RevenusCategoriels.IRevenu>}
     * @memberOf ImpotRevenuCalculette
     */
    public revenus: Array<RevenusCategoriels.IRevenu> = new Array<RevenusCategoriels.IRevenu>();

    /**
     * Ajouter un revenu à la calculette ne pas utiliser la méthode Array.push
     * 
     * @type {void}
     * @memberOf ImpotRevenuCalculette
     * @param {RevenusCategoriels.IRevenu} revenu Le revenu à ajouter
     */
    public ajouterRevenu(revenu: RevenusCategoriels.IRevenu) {

        revenu.handler = (oldVal, newVal) => {
            let total = 0;
            this.revenus.forEach( r => {
                total += r.revenuNet;
            });
            this.revenuNetGlobal = total;
        };

        if(!this.revenus || this.revenus.length == 0) this.revenuNetGlobal = revenu.revenuNet;
        this.revenus.push(revenu);
        
    }

    // OUTPUTS
    
    private _impotBrut : number = 0;
    /**
     * L'impot brut
     */
    public get impotBrut() : number {
        return this._impotBrut;
    }
    public set impotBrut(v : number) {
        this._impotBrut = v;
    }

    constructor(params: IParamsImpotRevenu){
        super(params);
        this.CONSTANTES_CALCUL = DICTIONNAIRE_CONSTANTES[params.millesime] ?  DICTIONNAIRE_CONSTANTES[params.millesime] : null;
        this.nbEnfants = params.nbEnfants ? params.nbEnfants : 0;
        this.couple = params.couple ? params.couple : false;
        this.revenuNetGlobal = params.revenuNetGlobal ? params.revenuNetGlobal : 0;
    }

    CONSTANTES_CALCUL: any;

    public calculer(nePasMaj: boolean = true){
        // console.log('calculer, revenu net %s', this.revenuNetGlobal);
        this.calculerNbParts();
        this.impotBrut = this.calculerImpotBrut();      
        // console.log('impotBrut %s', this.impotBrut);  
    }

    

    /**
     * Calcul un impot brut à partir d'un revenu net global
     */
    public calculerImpotBrut(): number {

        let res = 0;

        let q = this.revenuNetGlobal / this.nbParts;

        function calculerBarême(q, bareme){

            let impot1Part = 0;
            let impotTranche = 0;

            bareme.forEach( (tranche, i, arr) => {

                const plafondInferieur = i > 0 ? arr[i-1].PLAFOND : 0;

                if(q <= tranche.PLAFOND && plafondInferieur <= q) {
                    
                    impotTranche = (q - plafondInferieur) * tranche.TAUX;

                } else if(q > tranche.PLAFOND && tranche.PLAFOND > -1) {

                    impotTranche= tranche.TAUX * (tranche.PLAFOND - plafondInferieur);

                } else if(tranche.PLAFOND === -1 && q > plafondInferieur){

                    impotTranche = (q - plafondInferieur) * tranche.TAUX;

                } else {
                    impotTranche = 0;
                }

                // // console.log('r %s, tranche.plafond %s, impotTranche %s', q, tranche.PLAFOND, impotTranche);
                impot1Part += impotTranche;

            });

            // // console.log('impot brut 1 part %s', impot1Part);
            return Math.round(impot1Part);

        }
        
        let impotBrut = calculerBarême(q, this.CONSTANTES_CALCUL['BAREME_IR']) * this.nbParts;

        // // console.log('impot brut %s', impotBrut)

        // plafonnement du quotient familial
        if(this.nbParts > 2){

            let plafondQuotientApplicable = (this.nbParts - 2) / 0.5 * DICTIONNAIRE_CONSTANTES['2015']['PLAFOND_QUOTIENT_FAMILIAL'];
            let ir = calculerBarême(this.revenuNetGlobal / 2, this.CONSTANTES_CALCUL['BAREME_IR']) * 2;
            if(impotBrut < ir - plafondQuotientApplicable){
                // on retraite
                impotBrut = ir - plafondQuotientApplicable;                
            }
            
        }

        // // console.log('impotBrut avant décote ', impotBrut);

        // application de la décote
        let plafond = this.couple === false ? this.CONSTANTES_CALCUL['PLAFOND_DECOTE_CELIBATAIRE'] : this.CONSTANTES_CALCUL['PLAFOND_DECOTE_COUPLE']
        let decote = Math.round(plafond - 0.75 * impotBrut);
        if(decote > 0) impotBrut -= decote;

        // // console.log('décote ', decote);

        if(impotBrut < 0) impotBrut = 0;

        // // console.log('impotBrut ', impotBrut);

        // impot brut final après multiplication par nombre de parts
        return impotBrut;
    
    }

    context: IParamsImpotRevenu;

}