declare namespace Base {
    class BaseModel {
        constructor(o: any);
        static instanciate(o: any): any;
        getName(): any;
        static getName(): any;
        protected getPourcent(value: number): number;
        protected round(value: number): number;
        watch(prop: string, handler: Function): void;
        unwatch(prop: string): void;
    }
}
export default Base;
