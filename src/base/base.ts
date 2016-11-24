namespace Base {

    export class BaseModel {

        constructor(o: any) {
            if(o.id) this.id = o.id;
        }

        id: string;

        // on override la fonction qui vient de baseModel
        public static instanciate(o: any){

            if(!o) return null;
            
            // on doit déterminé si c'est une vente ou non pour renvoyer un objet vente correctement instancié
            if(o['getName'] && o.getName() === this.getName()){ // obtenir le nom du constructeur automatiquement pour remonter ce bloc dans BaseModel
                // c'est ok on retourne la vente
                return o; // TODO : voir si on peut décaller cette méthode directement dans le constructeur
            }
            else {
                return new this(o);          
            }

        };

        public getName(){
            return  (<any>this).constructor.name;
        };
        
        public static getName(){
            return  (<any>this).constructor.name;
        };

        protected getPourcent(value: number){
            return Math.round(value * 100 * 100) / 100;
        };

        protected round(value: number) {

            // arrondir à deux décimales
            var v = value * 100;
            v = Math.round(v);
            v = v / 100;

            return v;

        };

        // http://mattpolzin.com/?p=479
        public watch(prop: string, handler: Function) {
            var oldval = this[prop];
            var newval = oldval;
            var getter = function() {
                return newval;
            };
            var setter = function(val) {
                oldval = newval;
                return newval = handler.call(this, prop, oldval, val);
            };
            if (delete this[prop]) { // can't watch constants
                if (Object.defineProperty) { // ECMAScript 5
                Object.defineProperty(this, prop, {
                    'get': getter,
                    'set': setter
                });
                } else if (Object.prototype['__defineGetter__'] && Object.prototype['__defineSetter__']) { // legacy
                Object.prototype['__defineGetter__'].call(this, prop, getter);
                Object.prototype['__defineSetter__'].call(this, prop, setter);
                }
            }
        };

        public unwatch(prop: string) {
            var val = this[prop];
            delete this[prop]; // remove accessors
            this[prop] = val;
        };

    };

};

export default Base;