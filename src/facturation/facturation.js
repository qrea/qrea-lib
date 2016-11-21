System.register(['./models/models', './helpers/helpers'], function(exports_1) {
    var Models, Helpers;
    return {
        setters:[
            function (Models_1) {
                Models = Models_1;
            },
            function (Helpers_1) {
                Helpers = Helpers_1;
            }],
        execute: function() {
            exports_1("Models", Models);
            exports_1("Helpers", Helpers);
        }
    }
});
