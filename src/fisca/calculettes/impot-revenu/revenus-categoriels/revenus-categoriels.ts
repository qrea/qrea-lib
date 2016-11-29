import Base from '../../../../base/base';

export abstract class RevenuCategoriel extends Base.BaseModel implements IRevenu {
    
    /**
     * Revenu net imposable
     */
    
    private _revenuNet: number = 0;
    get revenuNet(): number {
        return this._revenuNet;
    }
    set revenuNet(v: number){
        
        if(v !== this._revenuNet){
            const old = this._revenuNet;
            this._revenuNet = v;
            //console.log('maj revenu net du revenu categoriel', old, v);
            if(this.handler) this.handler.call(this, old, v);
        }
        
    }

    handler: Function;

    /**
     * Revenu net imposable du contribuable principal
     */
    revenuNetPrincipal: number = 0;
    
    /**
     * Revenu net imposable du conjoint
     */
    revenuNetConjoint: number = 0;

    /**
     * Revenu net imposable des autres membres du foyer
     */
    revenuNetAutres: number = 0;    

    constructor(){
        super();
    }
        
}

export interface IRevenu {
    revenuNet: number;
    revenuNetConjoint: number;
    revenuNetAutres: number;
    revenuNetPrincipal: number;
    handler: Function;
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