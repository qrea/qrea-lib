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

export enum typeTraitementSalaire {
    traitementSalaire,
    pension
}

export interface ITraitementSalaire {
    typeRevenu?: typeTraitementSalaire;
    revenuBrut?: number;
    fraisReel?: number;
}

export class TraitementsSalaires extends RevenusCategoriels.RevenuCategoriel {

    constructor(params: ITraitementSalaire = null){
        
        super();
        if(params){
            this.typeRevenu = params.typeRevenu ? params.typeRevenu : typeTraitementSalaire.traitementSalaire;
            this.revenuBrut = params.revenuBrut ? params.revenuBrut : 0;
            this.fraisReel = params.fraisReel ? params.fraisReel : 0;
        }

        // console.log('typeRevenu=%s, revenuBrut=%s, fraisReel=%s', this.typeRevenu, this.revenuBrut, this.fraisReel);        
        
    }
    
    private _typeRevenu : typeTraitementSalaire = typeTraitementSalaire.traitementSalaire;
    public get typeRevenu() : typeTraitementSalaire {
        return this._typeRevenu;
    }
    public set typeRevenu(v : typeTraitementSalaire) {
        this._typeRevenu = v;
        this.calculer();
    }

    private calculer(){

        switch (this.typeRevenu) {
            case typeTraitementSalaire.pension:
                // console.log('calculer pension');
                this.revenuNet = this.calculetNetImposablePensions(this.revenuBrut);
                break;
            case typeTraitementSalaire.traitementSalaire:
                // console.log('calculer traitement salaire')
                this.revenuNet = this.calculerNetImposableTraitementsSalaires(this.revenuBrut, this.fraisReel);
                break;
            default:
                break;
        }

    }

    private _revenuBrut: number = 0;
    public get revenuBrut() : number {
        return this._revenuBrut;
    }
    public set revenuBrut(v : number) {
        this._revenuBrut = v;
        this.calculer();
    }

    private _fraisReel : number = 0;
    public get fraisReel() : number {
        return this._fraisReel;
    }
    public set fraisReel(v : number) {
        this._fraisReel = v;
        this.calculer();
    }

    get description(): string {

        let d = '';
        if(this.typeRevenu = typeTraitementSalaire.pension) {
            d += 'Pension ';
        } else if(this.typeRevenu = typeTraitementSalaire.traitementSalaire){
            d += 'Salaire '
        }
        d += this.revenuNet;
        return d;

    }

    categorie: string = 'Traitements et salaires';
    categorieShort: string = 'TS';

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