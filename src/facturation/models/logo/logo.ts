import Base from '../../../base/base';

export class Logo extends Base.BaseModel {

    constructor(params: any) {

        super(params);

        this.base64 = params.base64 || "";

    }

    base64: string;
    
}