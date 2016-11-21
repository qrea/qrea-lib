/// <reference path="../typings/index.d.ts" />

import { Facturation } from '../src/index';

describe('Facturation', () => {

    describe('#Models', () => {

        describe('#Adresse', () => {

            it("should instanciate Adresse", () => {
                let a = new Facturation.Models.Adresse({
                    ligne1: 'test'
                });
            });

        });

    });    

});