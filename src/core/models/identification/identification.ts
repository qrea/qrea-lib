import Base from '../../../base/base';

export class Identification extends Base.BaseModel {

    constructor(params: any) {

        super(params);

        this.SIREN = params.SIREN;
        this.NIC = params.NIC;
        this.APE = params.APE;
        this.RCS = params.RCS || null;
        this.RM = params.RM || null;

        // ON CONSTRUIT LE SIRET
        this.SIRET = this.SIREN + this.NIC;

    }

    SIREN: string;
    NIC: string;
    APE: string;
    RCS: string;
    RM: string;
    SIRET: string;

}