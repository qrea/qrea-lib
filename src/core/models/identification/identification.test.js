var assert = require('chai').assert;
var Models = require('../models');

describe('Core.Models.Identification', function () {

    it('doit instancier une identification et obtenir son siret', function () {

        const identification = new Models.Identification({
            SIREN: '123456789',
            NIC: '00019'
        });
        
        assert.isDefined(identification);
        assert.equal(identification.SIRET, '12345678900019', 'Le SIRET de l\'identifiant créé n\'est pas correctement construit');
        
    });


});