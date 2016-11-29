export abstract class RevenuCategoriel {
    
    /**
     * Revenu net imposable
     */
    revenuNet: number;
    
    /**
     * Revenu net imposable du contribuable principal
     */
    revenuNetPrincipal: number;
    
    /**
     * Revenu net imposable du conjoint
     */
    revenuNetConjoint: number;

    /**
     * Revenu net imposable des autres membres du foyer
     */
    revenuNetAutres: number;

    constructor(){

    }

}

import { TraitementsSalaires } from './traitements-salaires/traitements-salaires';
export { TraitementsSalaires };
import { RevenusFonciers } from './revenus-fonciers/revenus-fonciers';
export { RevenusFonciers };

export class RevenusCapitauxMobiliers extends RevenuCategoriel {

}

export class PlusValues extends RevenuCategoriel {

}

export class RemunerationDirigeant62 extends RevenuCategoriel {

}

export class BeneficesNonCommerciaux extends RevenuCategoriel {

}

export class BeneficesCommerciaux extends RevenuCategoriel {

}

export class BeneficesAgricoles extends RevenuCategoriel {
    
}