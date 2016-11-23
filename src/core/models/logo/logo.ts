import Base from '../../../base/base';

export interface ILogo {

    base64?: string;

}

export class Logo extends Base.BaseModel implements ILogo {

    constructor(params: ILogo = null) {

        super(params);

        this.base64 = params ? params.base64 : "";

      }

      base64: string;

}