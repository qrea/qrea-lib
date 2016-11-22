import Base from '../../../base/base';

export class Ligne extends Base.BaseModel {

    constructor(params: any) {

    super(params);
    this.compteLib = params.compteLib || null;
    this.compteNum = params.compteNum || null;
    this.credit = params.credit || 0;
    this.debit = params.debit || 0;

    }

    compteLib: string;
    compteNum: any;
    credit: number;
    debit: number;

}