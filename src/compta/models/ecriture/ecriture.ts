import Base from '../../../base/base';
import { Ligne } from '../ligne/ligne';

export class Ecriture extends Base.BaseModel {

    constructor(params: any) {

        // constructeur parent
        super(params);

        this.dateLet = params.dateLet || null;
        this.ecritureDate = params.ecritureDate || null;
        this.ecritureLib = params.ecritureLib || null;
        this.ecritureLet = params.ecritureLet || null;
        this.pieceRef = params.pieceRef || null;
        this.pieceDate = params.pieceDate || null;
        this.validDate = params.validDate || null;
        this.lignes = params.lignes || [];

    }

    public addLigne(l: Ligne) {
        this.lignes.push(l);
    }

    private checkEquilibre() {

        if (this.lignes.length < 1) {
            return true;
        } else if (this.lignes.length === 1) {
            return false;
        } else {
            var totalDebit = 0;
            var totalCredit = 0;
            this.lignes.forEach(function(l: Ligne) {
            totalDebit += l.debit;
            totalCredit += l.credit;
            }, this);
            return totalDebit === totalCredit;
        }

    }

    // private _equilibre: boolean;
    get equilibre(): boolean {
        return this.checkEquilibre();
    }

    dateLet: any;
    ecritureDate: any;
    ecritureLet: string;
    ecritureLib: string;
    pieceDate: any;
    pieceRef: string;
    validDate: any;
    lignes: Ligne[];

};