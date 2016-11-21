import Base from '../../../base/base';

export class Adresse extends Base.BaseModel {

    constructor(params: any) {

        super(params);

        if(!params.nom && !params.cp && params.ville) throw new Error('Le model \'Adresse\' requiert des paramètres \'nom\', \'cp\', \'ville\' non nuls');

        this.nom = params.nom;
        this.ligne1 = params.ligne1;
        this.ligne2 = params.ligne2 || null;
        this.cp = params.cp;
        this.ville = params.ville;
        this.pays = params.pays || null;

    }

    nom: string;
    ligne1: string;
    ligne2: string;
    cp: string;
    ville: string;
    pays: string;

}