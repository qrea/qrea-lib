var assert = require('chai').assert;
var lib = require('./index');

describe('Index', function () {

    it('doit charger la librairie', () => {
        assert.isDefined(lib);
    });

});