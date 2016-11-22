import Base from '../../../base/base';
import { Models as CoreModels } from '../../../core/core';
import { Reglement } from '../reglement/reglement';
import { Vente } from '../vente/vente';
import { Logo } from '../logo/logo';
export declare abstract class Document extends Base.BaseModel {
    constructor(params: any);
    protected calculate(): void;
    removeVenteByIndex(index: number): void;
    addReglement(newReglt: Reglement): void;
    removeReglementByIndex(index: number): void;
    toDDO(): {
        content: ({
            stack: (string | {
                text: string;
                style: string;
            })[];
            style: string;
        } | {
            text: string[];
        } | {
            text: string;
            margin: number[];
        } | {
            stack: ({
                text: (string | {
                    text: string;
                    italics: boolean;
                })[];
            } | string)[];
            style: string;
        } | {
            stack: (string | {
                fontSize: number;
                text: (string | {
                    text: string;
                    margin: number;
                })[];
            })[];
            margin: number[];
            alignment: string;
        })[];
        styles: {
            header: {
                fontSize: number;
                bold: boolean;
                alignment: string;
                margin: number[];
            };
            subheader: {
                fontSize: number;
            };
            superMargin: {
                margin: number[];
                fontSize: number;
            };
        };
    };
    libelle: string;
    date: Date;
    numero: string;
    prctRemiseGlobale: number;
    isAutoliquidation: boolean;
    details: string;
    private _totalHT;
    totalHT: number;
    private _totalTTC;
    totalTTC: number;
    private _totalTVA;
    totalTVA: number;
    private _netAPayer;
    netAPayer: number;
    private _entreprise;
    entreprise: CoreModels.Entreprise;
    private _logo;
    logo: Logo;
    private _client;
    client: CoreModels.Personne;
    private _reglements;
    reglements: Array<Reglement>;
    private _ventes;
    ventes: Array<Vente>;
    addVente(newVente: any): void;
    private _adresseLivraison;
    adresseLivraison: CoreModels.Adresse;
    detailsTVA: any;
}
export declare class DetailsTVA extends Base.BaseModel {
    constructor(taux: number, base?: number);
    private calculate();
    _taux: number;
    taux: number;
    _base: number;
    base: number;
    tva: number;
}
export declare class Facture extends Document {
    constructor(params: any);
}
export declare class FactureAcompte extends Document {
    constructor(params: any);
    acompteHT: number;
    acompteTVA: number;
    acompteTTC: number;
}
export declare class Devis extends Document {
    constructor(params: any);
    dateValidite: Date;
}
