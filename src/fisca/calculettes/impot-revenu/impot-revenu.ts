import { BaseCalculette, IParamsCalculette, ICalculette } from '../calculettes';

export interface IParamsImpotRevenu extends IParamsCalculette {

}

export const DICTIONNAIRE_CONSTANTES = {
    2015 : {
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
}

// TODO: ajouter le millésime lors de l'instanciation qu permettra de maj toutes les variables
export class ImpotRevenuCalculette extends BaseCalculette implements ICalculette {
    
    constructor(params: IParamsImpotRevenu){
        super(params);
    }

    public calculer(){

    }

    public static calculerImpotBrut(revenuNetGlobal: number, nbParts: number): number {

        let res = 0;

        let q = revenuNetGlobal / nbParts;

        function calculerBarême(q){

            let impot1Part = 0;
            let impotTranche = 0;

            DICTIONNAIRE_CONSTANTES['2015']['BAREME_IR'].forEach( (tranche, i, arr) => {

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
        
        let impotBrut = calculerBarême(q) * nbParts;

        // console.log('impot brut %s', impotBrut)

        // plafonnement du quotient familial
        if(nbParts > 2){

            let plafondQuotientApplicable = (nbParts - 2) / 0.5 * DICTIONNAIRE_CONSTANTES['2015']['PLAFOND_QUOTIENT_FAMILIAL'];
            let ir = calculerBarême(revenuNetGlobal / 2) * 2;
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