import Base from '../../../base/base';

export interface IIdentification {
    SIREN?: string;
    NIC?: string;
    APE?: string;
    RCS?: string;
    RM?: string;
    SIRET?: string;   
}

export class Identification extends Base.BaseModel implements IIdentification {

    constructor(params: IIdentification = null) {

        super(params);

        this.SIREN = params ? params.SIREN : null;
        this.NIC = params ? params.NIC : null;
        this.APE = params ? params.APE : null;
        this.RCS = params ? params.RCS : null;
        this.RM = params ? params.RM : null;

    }

    public get SIRET(): string {
        return this.SIREN + this.NIC;
    }

    SIREN: string;
    NIC: string;
    APE: string;
    RCS: string;
    RM: string;

}