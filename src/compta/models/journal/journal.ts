import Base from '../../../base/base';
import { Ecriture } from '../ecriture/ecriture';

export class Journal extends Base.BaseModel {

      constructor(params: any) {

        // constructor parent
        super(params);

        // ini des property
        this.journalCode = params.journalCode || null;
        this.journalLibelle = params.journalLibelle || null;
        this.ecritures = params.ecritures || [];

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

      get equilibre(): boolean {
        return this.checkEquilibre();
      }

      journalCode: string;
      journalLibelle: string;
      ecritures: Ecriture[];

};