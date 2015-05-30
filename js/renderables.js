define([], function() {
    var Renderables = function(renderer, renderables) {
        this.renderer = renderer;
        this.renderables = renderables || [];
    };

    Renderables.prototype = {
        render: function() {
            this.renderables.map(function(renderable) {
                renderable.fn.apply(this, renderable.args);
            }, this.renderer);
        }
    };

    return Renderables;
});