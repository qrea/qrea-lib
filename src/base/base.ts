namespace Base {

    export interface IBase {
        id?: any,
        relations?: {}
    }

    export class BaseModel {

        constructor(o: IBase = null) {

            if (o) {
                this.id = o.id ? o.id : o.id;
                this.relations = o.relations ? o.relations : null;
            }

            this.relations = this.relations ? this.relations : {};

        }

        id: any;
        relations: {};

        // on override la fonction qui vient de baseModel
        public static instanciate(o: any) {

            if (!o) return null;

            // on doit déterminé si c'est une vente ou non pour renvoyer un objet vente correctement instancié
            if (o['getName'] && o.getName() === this.getName()) { // obtenir le nom du constructeur automatiquement pour remonter ce bloc dans BaseModel
                // c'est ok on retourne la vente
                return o; // TODO : voir si on peut décaller cette méthode directement dans le constructeur
            }
            else {
                return new this(o);
            }

        };

        public getName() {
            return (<any>this).constructor.name;
        };

        public static getName() {
            return (<any>this).constructor.name;
        };

        protected getPourcent(value: number) {
            return Math.round(value * 100 * 100) / 100;
        };

        protected round(value: number) {

            // arrondir à deux décimales
            var v = value * 100;
            v = Math.round(v);
            v = v / 100;

            return v;

        };

    };

};

export default Base;