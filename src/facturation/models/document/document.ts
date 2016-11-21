import Base from '../../../base/base';
import { Models as CoreModels } from '../../../core/core';
import { Reglement } from '../reglement/reglement';
import { Vente } from '../vente/vente';
import { Logo } from '../logo/logo';

import { DocumentDefinitionObjectHelper } from '../../helpers/helpers';

export abstract class Document extends Base.BaseModel {

    constructor(params: any) {

        super(params);

        //this.typeDocument = null;
        this.libelle = params.libelle || null;
        this.date = params.date || Date.now();
        this.numero = params.numero || null;
        this.entreprise = params.entreprise;
        this.client = params.client;
        this.ventes = params.ventes || [];
        this.prctRemiseGlobale = params.prctRemiseGlobale || 0;
        this.isAutoliquidation = params.isAutoliquidation || false;
        this.reglements = params.reglements || [];
        // this.logoEntreprise = params.logoEntreprise || null;
        this.adresseLivraison = params.adresseLivraison || null;
        this.details = params.details || null;
        this.logo = params.logo || null;
        this.detailsTVA = {};

        if(this['calculate']) this.calculate();

    }

    protected calculate(){

        var self = this;

        var d = {};
        self._totalHT = 0;
        self._totalTTC = 0;
        self._totalTVA = 0;

        // TODO : facture d'acompte => scinder par taux de tva pour dans le calcul du details

        if(self.ventes && Array.isArray(self.ventes)){

            self.ventes.forEach(function(vente){

            self._totalHT += vente.totalHT;
            self._totalTVA += vente.totalTVA;
            self._totalTTC += vente.totalTTC;

            //if(!vente.article) return;

            // si le taux n'existe pas dans le calcul du details
            if(!d[vente.article.tauxTVA.toString()]){
                var details = new DetailsTVA(vente.article.tauxTVA);
                d[vente.article.tauxTVA.toString()] = details;
            }

            // ajout de la base
            d[vente.article.tauxTVA.toString()].base += vente.totalHT;

            });

        }        

        // ON arrondire
        self._totalTVA = self.round(self._totalTVA);
        self._totalHT = self.round(self._totalHT);
        self._totalTTC = self.round(self._totalTTC);

        self.detailsTVA = d;

        calculateNetAPayer();

        // calculer le net à payer de la facture
        function calculateNetAPayer(){

            var regle = 0; // le total deja payé

            // si les règlements ont été définis
            if(Array.isArray(self.reglements)){
            self.reglements.forEach(function(r){
                if(r.paye === true) regle = r.montant;
            });
            }

            // on stock le res
            self._netAPayer = self.round(self._totalTTC - regle);

        }

    }

    removeVenteByIndex(index: number){
        this.ventes.splice(index, 1);
        this.calculate();
    }

    addReglement(newReglt: Reglement){
        this.reglements.push(Reglement.instanciate(newReglt));
        this.calculate();
    }

    removeReglementByIndex(index: number){
        this.reglements.splice(index, 1);
        this.calculate();
    }

    /**
     * toDDO - Convertit le document DocumentDefinitionObject conforme
     * à la libraire pdfMake https://github.com/bpampuch/pdfmake
     *
     * @return {object}  ddo
     */
    toDDO(){
        var ddo = DocumentDefinitionObjectHelper.getDDO('template1');
        return ddo;
    }

    libelle: string;
    date: Date;
    numero: string;
    // entreprise: Entreprise; passage en mode instanciation
    // client: Personne;
    // ventes: Array<Vente>;
    prctRemiseGlobale: number;
    isAutoliquidation: boolean;
    // reglements: Array<Reglement>;
    // logoEntreprise: any;
    // adresseLivraison: Adresse;
    details: string;
    //logo: Logo;

    // propriété calculées
    private _totalHT: number; // calculé
    get totalHT(): number {
        this.calculate();
        return this._totalHT;
    }
    

    private _totalTTC: number; // calculé
    get totalTTC(): number {
        this.calculate();
        return this._totalTTC;
    }

    private _totalTVA: number; // calculé
    get totalTVA(): number {
        this.calculate();
        return this._totalTVA;
    }
    

    private _netAPayer: number;
    get netAPayer(): number {
        this.calculate();
        return this._netAPayer;
    }

    private _entreprise: CoreModels.Entreprise;
    get entreprise(): CoreModels.Entreprise {
        return this._entreprise;
    }
    set entreprise(e){
        this._entreprise = CoreModels.Entreprise.instanciate(e);        
    }

    private _logo: Logo;
    get logo(): Logo{
        return this._logo;
    }
    set logo(l){
        this._logo = Logo.instanciate(l);
    }
    
    private _client: CoreModels.Personne;
    get client(): CoreModels.Personne {
        return this._client;
    }
    set client(c){
        this._client = CoreModels.Personne.instanciatePhysiqueOuMorale(c);
    }

    private _reglements: Array<Reglement>;
    get reglements(): Array<Reglement>{
        return this._reglements;
    }

    set reglements(reglts){
        if(!reglts) return;
        this._reglements ? this._reglements.length = 0 : this._reglements = [];
        if(Array.isArray(reglts)){
            for (var i = 0; i < reglts.length; i++) {
            var element = reglts[i];
            this._reglements.push(Reglement.instanciate(element));
            }
        } else {
            this._reglements.push(Reglement.instanciate(reglts));
        }
    }

    private _ventes: Array<Vente>;
    get ventes(): Array<Vente> {
        return this._ventes;
    }
    set ventes(ventes){
    
        if(!ventes) return;

        this._ventes ? this._ventes.length = 0 : this._ventes = []; // reset du tableau;

        // on vérifie si c'est un seul object ou un tableau
        if(Array.isArray(ventes)){
            
            for (var i = 0; i < ventes.length; i++) {
            
            var element = ventes[i];
            this._ventes.push(Vente.instanciate(element));

            }

        } else {

            this._ventes.push(Vente.instanciate(ventes));

        }

    }

    public addVente(newVente: any){
        this._ventes.push(Vente.instanciate(newVente));
        this.calculate();
    }

    private _adresseLivraison: CoreModels.Adresse;
    get adresseLivraison(): CoreModels.Adresse {
        return this._adresseLivraison;
    }

    set adresseLivraison(a){
        this._adresseLivraison = CoreModels.Adresse.instanciate(a);
    }

    detailsTVA: any;

}

export class DetailsTVA extends Base.BaseModel {

    constructor(taux: number, base?: number){
        super({});
        this._taux = taux;
        this._base = base || 0;
        this.calculate();
    }

    private calculate(){
        this.tva = this._taux * this._base;
        this.tva = this.round(this.tva);
    }

    _taux: number;
    get taux(): number {
        return this._taux;
    }
    set taux(newValue: number){
        this._taux = newValue;
        this.calculate();
    }

    _base: number;
    get base(): number {
        return this._base;
    }
    set base(newValue: number){
        this._base = newValue;
        this.calculate();
    }

    // propriété calculée
    tva: number;

}

export class Facture extends Document {

    constructor(params: any) {

    super(params);
    
    }

}

export class FactureAcompte extends Document {

    constructor(params: any){

        super(params);
        this.acompteHT = params.acompteHT || 0;
        this.acompteTVA = params.acompteTVA || 0;
    }

    acompteHT: number;
    acompteTVA: number;
        
    get acompteTTC(): number{
        return this.acompteHT + this.acompteTVA;

    }
    
}

export class Devis extends Document {

    constructor(params: any) {

        super(params);

        this.dateValidite = params.dateValidite;

    }

    dateValidite: Date;

}