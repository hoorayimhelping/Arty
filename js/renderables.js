define([], function() {
    'use strict';

    var Renderables = function(renderables) {
        this.renderables = renderables || [];
    };

    Renderables.prototype = {
        add: function(renderable) {
            this.renderables.push(renderable);
        },

        render: function() {
            this.renderables.map(function(renderable) {
                renderable.render(renderable.args);
            });
        }
    };

    return Renderables;
});