import Base from '../../../../base/base';

export enum proprietaireRevenu {
    principal,
    conjoint,
    autre
}

export abstract class RevenuCategoriel extends Base.BaseModel implements IRevenu {
    
    /**
     * Revenu net imposable
     */    
    protected _revenuNet: number = 0;
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

    
    revenuBrut: number = 0;
    handler: Function;
    description: string;
    categorie: string;
    categorieShort: string;

    proprietaire: proprietaireRevenu;
    
    get proprietaireLibelle(): string {
        switch (this.proprietaire) {
            case proprietaireRevenu.autre:
                return 'Autre';
            case proprietaireRevenu.conjoint:
                return 'Conjoint';
            case proprietaireRevenu.principal:
                return 'Principal';
            default:
                return 'Non défini';
        }
    }  

    constructor(){
        super();
    }
        
}

export interface IRevenu {
    revenuNet: number;
    handler: Function;
    description: string;
    categorie: string;
    categorieShort: string;
    proprietaire: proprietaireRevenu;
}

import { TraitementsSalaires, ITraitementSalaire, typeTraitementSalaire  } from './traitements-salaires/traitements-salaires';
export { TraitementsSalaires, ITraitementSalaire, typeTraitementSalaire };
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