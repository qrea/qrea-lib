/// <reference path="../typings/index.d.ts" />

import * as QreaLib from '../src/index';

describe('Facturation', () => {

    describe('#Models', () => {

        describe('#Adresse', () => {

            it("should instanciate Test", () => {
                let test = new QreaLib.Facturation.Models.Test();
            });

            it("should instanciate Adresse", () => {
                let a = new QreaLib.Facturation.Models.Adresse({});
            });

        });

    });    

});