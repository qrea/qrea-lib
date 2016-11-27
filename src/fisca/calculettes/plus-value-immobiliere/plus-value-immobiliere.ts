import { BaseCalculette, IParamsCalculette, ICalculette } from '../base/base';

export interface IParamsPlusValueImmobiliere extends IParamsCalculette {
    dateCession: Date;
    dateAcquisition: Date;
    prixRevient: number;
    prixCession: number;
    travaux?: number;
    fraisAcquisition?: number;
}

export const TAUX_IMPOT_PV_IMMO: number = 0.19;

export const ABATTEMENTS_PV_IMMO = [
    { "annee": 6, "abattIr": 0.0165, "abattPS": 0.06 },
    { "annee": 7, "abattIr": 0.033, "abattPS": 0.12 },
    { "annee": 8, "abattIr": 0.0495, "abattPS": 0.18 },
    { "annee": 9, "abattIr": 0.066, "abattPS": 0.24 },
    { "annee": 10, "abattIr": 0.0825, "abattPS": 0.3 },
    { "annee": 11, "abattIr": 0.099, "abattPS": 0.36 },
    { "annee": 12, "abattIr": 0.1155, "abattPS": 0.42 },
    { "annee": 13, "abattIr": 0.132, "abattPS": 0.48 },
    { "annee": 14, "abattIr": 0.1485, "abattPS": 0.54 },
    { "annee": 15, "abattIr": 0.165, "abattPS": 0.6 },
    { "annee": 16, "abattIr": 0.1815, "abattPS": 0.66 },
    { "annee": 17, "abattIr": 0.198, "abattPS": 0.72 },
    { "annee": 18, "abattIr": 0.2145, "abattPS": 0.78 },
    { "annee": 19, "abattIr": 0.231, "abattPS": 0.84 },
    { "annee": 20, "abattIr": 0.2475, "abattPS": 0.9 },
    { "annee": 21, "abattIr": 0.264, "abattPS": 0.96 },
    { "annee": 22, "abattIr": 0.28, "abattPS": 1 },
    { "annee": 23, "abattIr": 0.37, "abattPS": 1 },
    { "annee": 24, "abattIr": 0.46, "abattPS": 1 },
    { "annee": 25, "abattIr": 0.55, "abattPS": 1 },
    { "annee": 26, "abattIr": 0.64, "abattPS": 1 },
    { "annee": 27, "abattIr": 0.73, "abattPS": 1 },
    { "annee": 28, "abattIr": 0.82, "abattPS": 1 },
    { "annee": 29, "abattIr": 0.91, "abattPS": 1 },
    { "annee": 30, "abattIr": 1, "abattPS": 1 }
]

export class PlusValueImmobiliereCalculette extends BaseCalculette implements ICalculette {
    
    constructor(params: IParamsPlusValueImmobiliere){
        super(params);
        this.hydrateParams(params);
    }

    private hydrateParams(params: IParamsPlusValueImmobiliere){

        // console.log('hydrateParams()');
        this._dateCession = params.dateCession ? params.dateCession : null;
        this._dateAcquisition = params.dateAcquisition ? params.dateAcquisition : null;
        this._prixRevient = params.prixRevient ? params.prixRevient : null;
        this._prixCession = params.prixCession ? params.prixCession : null;
        this._travaux = params.travaux ? params.travaux: 0;
        this._fraisAcquisition = params.fraisAcquisition ? params.fraisAcquisition : 0;
        this.calculer();

    }

    // PROPERTIES FOURNIES A L'INSTANCIATION
    _dateCession: Date;
    /**
     * Date de cession du bien immobilier
     */
    set dateCession(value: Date){
        this._dateCession = value;
        this.calculer();        
    }
    get dateCession(): Date {
        return this._dateCession;
    }

    _dateAcquisition: Date;
    /**
     * Date d'acquisition du bien immobilier
     */
    set dateAcquisition(value: Date){
        this._dateAcquisition = value;
        this.calculer();        
    }
    get dateAcquisition(): Date{
        return this._dateAcquisition;
    }

    _prixRevient: number;
    /**
     * Prix d'achat du bien immobilier
     */
    set prixRevient(value: number){
        this._prixRevient = value;
        this.calculer();       
    }
    get prixRevient(): number {
        return this._prixRevient;
    }

    _prixCession: number;
    /**
     * Prix de cession du bien immobilier
     */
    set prixCession(value: number){
        this._prixCession = value;
        this.calculer();        
    }
    get prixCession(): number {
        return this._prixCession;
    }

    _travaux: number;
    /**
     * Le montant des travaux effectués
     */
    set travaux(value: number){
        this._travaux = value;
        this.calculer();        
    }
    get travaux(): number {
        return this._travaux;
    }

    _fraisAcquisition: number;
    /**
     * Le montant des frais d'acquisition du bien immobilier
     */
    set fraisAcquisition(value: number){
        this._fraisAcquisition = value;
        this.calculer();        
    }
    get fraisAcquisition(): number {
        return this._fraisAcquisition;
    }

    // Permet de savoir si des modification de variables d'entrées ont eu lieu
    private modificiations = false;

    // PROPERTIES CALCULEES
    
    private _dureeDetention: number;
    /**
     * Durée de détention en années
     */
    public get dureeDetention(): number {
        return this._dureeDetention;
    }

    private _majoFrais: number;
    /**
     * Frais d'acquisition retenue
     */
    get majoFrais(): number {        
        return this._majoFrais;
    }

    private _majoTravaux: number;
    /**
     * Montant des travaux retenus
     */
    get majoTravaux(): number {
        return this._majoTravaux;
    }

    private _pxAcquisitionMajo: number;
    /**
     * Prix d'acquisition retenu
     */
    get pxAcquisitionMajo(): number{
        return this._pxAcquisitionMajo;
    }

    private _pvBrute: number;
    /**
     * Plus value avant abattement pour durée de détention
     */
    get pvBrute(): number {
        return this._pvBrute;
    }

    private _abattementIr: number;
    /**
     * Abattement retenu pour l'impôt sur le revenu
     */
    get abattementIr(): number {
        return this._abattementIr;
    }

    private _abttIrM: number;
    get abttIrM(): number {
        return this._abttIrM;
    }

    private _pvNetteIr: number;
    get pvNetteIr(): number {
        return this._pvNetteIr;
    }

    private _irCession: number;
    /**
     * Impôt sur le revenu calculé
     */
    get irCession(): number {
        return this._irCession;
    }

    private _surtaxe: number;
    /**
     * Surtaxe immobilière calculée
     */
    get surtaxe(): number {
        return this._surtaxe;
    }

    private _abattementPs: number;
    /**
     * Abattement retenu pour le calcul des prélèvements sociaux
     */
    get abattementPs(): number {
        return this._abattementPs;
    }

    private _abttPsM: number;
    get abttPsM(): number {
        return this._abttPsM;
    }

    private _pvNettePS:number;
    /**
     * Plus value nette retenue pour le calcul des prélèvements sociaux
     */
    get pvNettePS(): number {
        return this._pvNettePS;
    }

    private _psCession: number;
    /**
     * Plus value retenue pour le calcul de la plus value imposable à l'impôt sur le revenu
     */
    get psCession(): number {
        return this._psCession;
    }

    private _totalImpots: number;
    /**
     * Imposition totale : IR + PS
     */
    get totalImpots(): number {
        return this._totalImpots;
    }

    private _soldeNet: number;
    /**
     * Produit de cession net de toute fiscalité
     */
    get soldeNet(): number {
        return this._soldeNet;
    }

    /**
     * Demande de calcul
     * @param {IParamsPlusValueImmobiliere} params Les paramètres nécessaire au calcul d'une plus value immobilière
     */
    public static calculer(params: IParamsPlusValueImmobiliere): PlusValueImmobiliereCalculette {
        
        // si on passe des params on met à jout les info
        if(params){
            return new PlusValueImmobiliereCalculette(params);
        }

    }

    /**
     * Calcul l'impot sur la plus value
     */
    private calculer() {        

        if(!this._dateCession && !this._dateAcquisition && !this._prixCession && !this._prixRevient) return;

        // console.log('calculer()');

        this._dureeDetention = this.dateDiff(this._dateAcquisition, this._dateCession);
        // console.log('dureDetention %s', this._dureeDetention);

        this._majoFrais = this.calculerMajorationFrais(this._fraisAcquisition, this._prixRevient);
        // console.log('majoFrais', this._majoFrais);

        this._majoTravaux = this.calculerMajorationTravaux(this._travaux, this._prixRevient, this._dureeDetention);
        // console.log('majoFrais', this._majoFrais);

        this._pxAcquisitionMajo = this._prixRevient + this._majoFrais + this._majoTravaux;
        // console.log('pxAcquisitionMajo', this._pxAcquisitionMajo);

        this._pvBrute = this.retraiterZeroNegatif(this._prixCession - this._pxAcquisitionMajo);
        // console.log('pvBrute', this._pvBrute);

        this._abattementIr = this.calculerAbattIr(this._dureeDetention);
        // console.log('abattementIr', this._abattementIr);

        this._abttIrM = this.abattementIr / 100 * this._pvBrute;
        // console.log('abattIr', this._abttIrM);

        this._pvNetteIr = this._pvBrute - this._abttIrM;
        // console.log('pvNette', this._pvNetteIr);

        this._irCession = this._pvNetteIr * 0.19;
        // console.log('irCession', this._irCession);

        this._surtaxe = this.calculerSurtaxe(this._pvNetteIr);
        // console.log('surtaxe', this._surtaxe);

        this._abattementPs = this.calculerAbattps(this._dureeDetention);
        // console.log('abattementPs', this._abattementPs);

        this._abttPsM = this._abattementPs / 100 * this._pvBrute;
        // console.log('abattPS', this._abttPsM);

        this._pvNettePS = this._pvBrute - this._abttPsM;
        // console.log('pvNettePS', this._pvNettePS);

        this._psCession = this._pvNettePS * 0.155;
        // console.log('psCession', this._psCession);

        this._totalImpots = this._psCession + this._surtaxe + this._irCession;
        // console.log('totalImpots', this._totalImpots);

        this._soldeNet = this._prixCession - this._totalImpots;
        
        // console.log('soldeNet', this._soldeNet);

        return null;
        
    }

    /**
     * Calcul le nombre d'années entre deux dates
     * @param { Date } dateOld La date de départ
     * @param { Date } dateNew La date de fin
     */
    private dateDiff(dateOld: Date, dateNew: Date): number {

        // console.log('dateOld %s dateNew %s', dateOld, dateNew);
          
          var ynew = dateNew.getFullYear();
          var mnew = dateNew.getMonth();
          var dnew = dateNew.getDate();

          var yold = dateOld.getFullYear();
          var mold = dateOld.getMonth();
          var dold = dateOld.getDate();
          var diffa = ynew - yold;

          if (mold > mnew) {
              diffa = diffa - 1;
          } else if (mold == mnew) {
              if (dold > dnew) {
                  diffa = diffa - 1;
              }
          }

          return diffa;

      }


      /**
       * Calcul la majoration frais
       * @param {number} f les frais
       * @param {number} s le prix d'acquisition
       */
      private calculerMajorationFrais(f: number, s: number): number {

        var majo = 0.075 * s;

        if (f > 0.075 * s) {
            majo = f;
        }
        
        return majo;

      }

      /**
       * Renvoi 0 si la valeur est négative
       * @param {number} value la valeur à retraiter 
       */ 
      private retraiterZeroNegatif(value: number) {
          if (value < 0) return 0;
          return value;
      }

      /**
       * Calcul majoration travaux
       * @param {number} f Le montant des travaux effectués
       * @param {number} s Le prix d'acquisition
       * @param {number} d La durée de détention
       */
      private calculerMajorationTravaux(f, s, d): number {
          var majo = f;
          if (d > 5) {
              if (f < 0.15 * s)
              { majo = 0.15 * s };
          }
          { return majo }

      }

      // 
      /**
       * Calcul l'abattement d'IR
       * @param {number} d La durée de détention
       * @return {number} Le pourcentage, tel que 100 = 100%
       */
      private calculerAbattIr(d): number {

          if (d < 6) {
              return 0;
          } else if (d <= 30) {
              d = d - 6;
              return ABATTEMENTS_PV_IMMO[d].abattIr * 100
          } else { 
              return 100; 
        }

      }

      // calculer abatt PS 
      /**
       * Calcul l'abattement pour les prélèvements sociaux
       * @param {number} d La durée de détention
       * @return {number} Le pourcentage, tel que 100 = 100%
       */
      private calculerAbattps(d): number {

        if (d < 6) {
            return 0;
        } else if (d <= 30) {
            d = d - 6;
            return ABATTEMENTS_PV_IMMO[d].abattPS * 100
        } else { 
            return 100;
        }

      }

    //   /**
    //    * Calculer abtt duree détention titre ??? 
    //    * @param {number} r
    //    * @param {number} d
    //    */
    //   private abattementDuree(r, d) {
    //       var abttD = 0;
    //       if (r === 1) {
    //           if (d < 2) {
    //               abttD = 0;
    //           }
    //           else if (d < 8) {
    //               abttD = 50;
    //           }
    //           else { abttD = 65; }
    //       }
    //       else {
    //           if (d < 1) {
    //               abttD = 0;
    //           }
    //           else if (d < 4) {
    //               abttD = 50;
    //           }
    //           else if (d < 8) {
    //               abttD = 65;
    //           }
    //           else { abttD = 85; }

    //       }
    //       { return abttD; }
    //   }

      // 
      /**
       * Calcul la sur taxe
       * @param {number} PV La plus value
       */
      private calculerSurtaxe(PV: number): number {

          var surT = 0;
          if (PV < 50000) { surT = 0; }
          if (PV < 60000) { surT = 2 / 100 * PV - (60000 - PV) * 1 / 20; }
          if (PV < 100000) { surT = 2 / 100 * PV; }
          if (PV < 110000) { surT = 3 / 100 * PV - (110000 - PV) * 1 / 10; }
          if (PV < 150000) { surT = 3 / 100 * PV; }
          if (PV < 160000) { surT = 4 / 100 * PV - (160000 - PV) * 15 / 100; }
          if (PV < 200000) { surT = 4 / 100 * PV; }
          if (PV < 210000) { surT = 5 / 100 * PV - (210000 - PV) * 20 / 100; }
          if (PV < 250000) { surT = 5 / 100 * PV; }
          if (PV < 260000) { surT = 6 / 100 * PV - (260000 - PV) * 25 / 100; }
          if (PV < 260000) { surT = 6 / 100 * PV; }
          return surT;

      }
      


}