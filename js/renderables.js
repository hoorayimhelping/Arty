define([], function() {
    var Renderables = function(renderer, renderables) {
        this.renderer = renderer;
        this.renderables = renderables || [];
    };

    Renderables.prototype = {
        add: function(renderable) {
            this.renderables.push(renderable);
        },

        render: function() {
            this.renderables.map(function(renderable) {
                renderable.render.apply(this, renderable.args);
            }, this.renderer);
        }
    };

    return Renderables;
});