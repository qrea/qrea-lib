System.register(['./core/core', './facturation/facturation'], function(exports_1) {
    var Core, Facturation;
    return {
        setters:[
            function (Core_1) {
                Core = Core_1;
            },
            function (Facturation_1) {
                Facturation = Facturation_1;
            }],
        execute: function() {
            exports_1("Facturation", Facturation);
            exports_1("Core", Core);
        }
    }
});
