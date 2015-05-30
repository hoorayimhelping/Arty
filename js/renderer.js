define([], function() {
    var Renderer = function(context) {
        this.context = context;
    };

    Renderer.prototype = {
        init: function() {}
    };

    return Renderer;
});