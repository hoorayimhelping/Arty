define([], function() {
    'use strict';

    var Renderables = function(renderables) {
        this.renderables = renderables || [];
    };

    Renderables.prototype = {
        add: function(renderable) {
            this.renderables.unshift(renderable);
        },

        render: function() {
            this.renderables.map(function(renderable) {
                renderable.render(renderable.args);
            });
        },

        filter: function(fn) {
            this.renderables = this.renderables.filter(fn);
        }
    };

    return Renderables;
});