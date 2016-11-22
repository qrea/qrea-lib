import Base from '../../../base/base';
import { Ecriture } from '../ecriture/ecriture';
import { ISoldeFilter } from '../../filters/filters';
import { Ligne } from '../ligne/ligne';
import * as Helpers from '../../helpers/helpers';

export interface IJournal {
  code: string;
  libelle: string;
  ecritures: Ecriture[];
}

export class Journal extends Base.BaseModel implements IJournal {

      constructor(params: IJournal) {

        // constructor parent
        super(params);

        // ini des property
        this.code = params.code || null;
        this.libelle = params.libelle || null;
        this.ecritures = params.ecritures || new Array<Ecriture>();

      }

      public addEcriture(e: Ecriture) {
        if (!e.equilibre) {
          throw new Error('L\'écriture n\'est pas équilibrée');
        } else {
          this.ecritures.push(e);
        }
      }

      private checkEquilibre() {

        if (!this.ecritures || this.ecritures.length === 0) {
          return true;
        } else if (this.ecritures.length === 1) {
          return false;
        } else {

          var test = true;
          this.ecritures.forEach(function(e: Ecriture) {
            if (!e.equilibre) test = false;
          });

          return test;

        }

      }

      public getSolde(c: string, filter: ISoldeFilter = null){

        let numero: string = <string>c;
        let solde: number = 0;

        this.ecritures.forEach(e => {
          
          // on test le start date
          let testStart = false;
          if(!filter || !filter.start) testStart = true;          
          if((filter && filter.start) && filter.start <= e.ecritureDate) testStart = true;

          // on test la end date
          let testEnd = false;
          if(!filter || !filter.end) testEnd = true;
          if((filter && filter.end) && filter.end >= e.ecritureDate) testEnd = true;

          e.lignes.forEach(l => {

            if(Helpers.numerosCompteEquals(l.compteNum, c) && testStart && testEnd){
              solde += l.debit;
              solde += -l.credit;
            }

          });

        });
        
        return solde;
      }

      get equilibre(): boolean {
        return this.checkEquilibre();
      }

      code: string;
      libelle: string;
      ecritures: Ecriture[];

};