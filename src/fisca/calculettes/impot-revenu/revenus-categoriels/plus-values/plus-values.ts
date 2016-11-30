import * as RevenusCategoriels from '../revenus-categoriels';
import * as moment from 'moment';

export const CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015 = {
    ABATTEMENT_FIXE_DEPART_RETRAITE: 500000,
    ABATTEMENTS_REGIME_DROIT_COMMUN:[
        {
            detentionMax: 2,
            taux: 0
        },
        {
            detentionMax: 8,
            taux: 0.5
        },
        {
            detentionMax: -1,
            taux: 0.65
        }
    ],
    ABATTEMENTS_REGIME_INCITATIF:[
        {
            detentionMax: 1,
            taux: 0
        },
        {
            detentionMax: 4,
            taux: 0.5
        },
        {
            detentionMax: 8,
            taux: 0.65
        },
        {
            detentionMax: -1,
            taux: 0.85
        }
    ]
}

export enum regimeCessionValeurMobiliere {
    droitCommun,
    incitatif,
    departRetraite
}

export enum typeCession {
    titres,
    cessionPEA
}

export class PlusValues extends RevenusCategoriels.RevenuCategoriel {

    get description(): string {

        let d = '';
        if(this.revenuNet < 0){
            d += 'Plus value ' + this.revenuNet;
        } else {
            d += 'Moins value reportable ' + this.revenuNet;
        }
        
        return d;

    }

    categorie: string = 'Plus value';
    categorieShort: string = 'PV';
    
    private _regime : regimeCessionValeurMobiliere = regimeCessionValeurMobiliere.droitCommun;
    /**
     * Régime
     */
    public get regime() : regimeCessionValeurMobiliere {
        return this._regime;
    }
    public set regime(v : regimeCessionValeurMobiliere) {
        this._regime = v;
        this.calcuerRevenuNet();
    }
    
    private _typeCession : typeCession = typeCession.titres;
    /**
     * Le type de plus value à calculer
     */
    public get typeCession() : typeCession {
        return this._typeCession;
    }
    public set typeCession(v : typeCession) {
        this._typeCession = v;
        this.calcuerRevenuNet();
    }

    private _dateAcquisition : Date = new Date();
    /**
     * Date d'acquisition
     */
    public get dateAcquisition() : Date {
        return this._dateAcquisition;
    }
    public set dateAcquisition(v : Date) {
        this._dateAcquisition = v;
        this.calcuerRevenuNet();
    }
    
    private _dateCession : Date = new Date();
    /**
     * Date de cession des titres
     */
    public get dateCession() : Date {
        return this._dateCession;
    }
    public set dateCession(v : Date) {
        this._dateCession = v;
        this.calcuerRevenuNet();
    }
    
    private _dureeDetention : number = 0;
    public get dureeDetention() : number {
        return this._dureeDetention;
    }
    
    private _prixRevient : number = 0;
    /**
     * Prix de revient
     */
    public get prixRevient() : number {
        return this._prixRevient;
    }
    public set prixRevient(v : number) {
        this._prixRevient = v;
        this.calcuerRevenuNet();
    }    
    
    private _prixCession : number = 0;
    /**
     * Le prix de cession
     */
    public get prixCession() : number {
        return this._prixCession;
    }
    public set prixCession(v : number) {
        this._prixCession = v;
        this.calcuerRevenuNet();
    }
    
    private _plusValueBrute : number = 0;
    /**
     * La plus value calculé avant abattement
     */
    public get plusValueBrute() : number {
        return this._plusValueBrute;
    }

    private calcuerRevenuNet(){

        // on calcul la plus value brute
        this._plusValueBrute = this.prixCession - this.prixRevient;

        // on évacue si moins value
        if(this.plusValueBrute < 0){
            this.revenuNet = this.plusValueBrute;
            return ;
        }

        // console.log('plusValueBrute %s', this.plusValueBrute);
                
        // on calcul la durée de détention en année
        let old = moment(this.dateAcquisition);
        let n = moment(this.dateCession);
        this._dureeDetention = n.diff(old, 'years');        

        // on calcul l'abattement fonction du régime et de la durée de détention
        let abatt = 0;
        let tauxAbatt = 0;

        switch (this.regime) {

            case regimeCessionValeurMobiliere.droitCommun:
                tauxAbatt = this.getTauxAbattement(this.dureeDetention, 'ABATTEMENTS_REGIME_DROIT_COMMUN');
                abatt = Math.round(this.plusValueBrute * tauxAbatt);
                break;

            case regimeCessionValeurMobiliere.incitatif:
                tauxAbatt = this.getTauxAbattement(this.dureeDetention, 'ABATTEMENTS_REGIME_INCITATIF');
                abatt = Math.round(tauxAbatt * this.plusValueBrute);
                break;

            case regimeCessionValeurMobiliere.departRetraite:
                // ATTENTION ICI ON A UN CALCUL COMMUN POUR LE TAUX AVEC LE REGIME INCITATIF MAIS
                tauxAbatt = this.getTauxAbattement(this.dureeDetention, 'ABATTEMENTS_REGIME_INCITATIF');
                if(this.plusValueBrute <= CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015['ABATTEMENT_FIXE_DEPART_RETRAITE']) {
                    abatt = this.plusValueBrute;
                } else {
                    const baseAbatt = this.plusValueBrute - CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015['ABATTEMENT_FIXE_DEPART_RETRAITE'];
                    abatt = Math.round(baseAbatt * tauxAbatt);
                    abatt += CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015['ABATTEMENT_FIXE_DEPART_RETRAITE'];
                    //console.log('taux abattement %s, baseAbatt %s, abatt %s', tauxAbatt, baseAbatt, abatt);                
                }
                break;

            default:
                tauxAbatt = this.getTauxAbattement(this.dureeDetention, 'ABATTEMENTS_REGIME_INCITATIF');
                abatt = Math.round(tauxAbatt * this.plusValueBrute);
                break;

        }

        // on calcul le revenu net
        this.revenuNet = this.plusValueBrute - abatt;
        if(this.revenuNet < 0) this.revenuNet = 0; // si l'application des 500k€ nous enmène < 0 on corrige
        
        // console.log('abattement %s sur prix de cession %s = net %s', abatt, this.prixCession, this.revenuNet);

    }

    private getTauxAbattement(dureeDetention: number, key: string): number {

    
        // par défaut l'abattement est le plus élevé puisqu'on utilise -1 en dureeDetention
        let abatt: number = CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015[key][CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015[key].length - 1].taux;

        CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015[key].forEach( (abattement, i, arr) => {
            
            const detentionMaxPrec = arr[i - 1] ? arr[i - 1].detentionMax : 0;
            
            if(dureeDetention < abattement.detentionMax && dureeDetention > detentionMaxPrec){
                abatt = abattement.taux;
            }

        });

        //console.log('duree detention %s ,abattement %s = %s', dureeDetention, key, abatt);       

        // a la fin on peut retourner
        return abatt;

    }

    constructor(){
        super();
    }

}