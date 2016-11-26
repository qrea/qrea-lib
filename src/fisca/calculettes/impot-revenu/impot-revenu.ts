import { BaseCalculette, IParamsCalculette, ICalculette } from '../calculettes';

export interface IParamsImpotRevenu extends IParamsCalculette {
    millesime: string;
}

export interface IConstantesCalcul {
    PLAFOND_QUOTIENT_FAMILIAL: number,
    BAREME_IR: any,
}

const DICTIONNAIRE_CONSTANTES_2015: IConstantesCalcul = {
    PLAFOND_QUOTIENT_FAMILIAL: 1510,
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
    
    constructor(params: IParamsImpotRevenu){
        super(params);
        this.CONSTANTES_CALCUL = DICTIONNAIRE_CONSTANTES[params.millesime] ?  DICTIONNAIRE_CONSTANTES[params.millesime] : null;
    }

    CONSTANTES_CALCUL: any;

    public calculer(){
        this.calculerImpotBrut
    }

    /**
     * Calcul un impot brut à partir d'un revenu net global
     * @param {number} revenuNetGlobal le revenu net global en €
     * @param {number} nbParts le nombre de parts du foyer fiscal
     * @returns {number} impot brut en €
     */
    public calculerImpotBrut(revenuNetGlobal: number, nbParts: number): number {

        let res = 0;

        let q = revenuNetGlobal / nbParts;

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

                // console.log('r %s, tranche.plafond %s, impotTranche %s', q, tranche.PLAFOND, impotTranche);
                impot1Part += impotTranche;

            });

            // console.log('impot brut 1 part %s', impot1Part);
            return Math.round(impot1Part);

        }
        
        let impotBrut = calculerBarême(q, this.CONSTANTES_CALCUL['BAREME_IR']) * nbParts;

        // console.log('impot brut %s', impotBrut)

        // plafonnement du quotient familial
        if(nbParts > 2){

            let plafondQuotientApplicable = (nbParts - 2) / 0.5 * DICTIONNAIRE_CONSTANTES['2015']['PLAFOND_QUOTIENT_FAMILIAL'];
            let ir = calculerBarême(revenuNetGlobal / 2, this.CONSTANTES_CALCUL['BAREME_IR']) * 2;
            if(impotBrut < ir - plafondQuotientApplicable){
                // on retraite
                impotBrut = ir - plafondQuotientApplicable;                
            }
            
        }

        // impot brut final après multiplication par nombre de parts
        return impotBrut;
    
    }

    context: IParamsImpotRevenu;

}