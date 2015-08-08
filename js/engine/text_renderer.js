define([], function() {
    'use strict';

    var TextRenderer = function(context) {
        this.context = context;
    };

    TextRenderer.prototype = {
        init: function() {
            this.defaults();
        },

        renderText: function() {
            var options = arguments[0];

            this.defaults();
            this.context.fillText(options.text, options.coords.x, options.coords.y);
        },

        options: function(options) {
            this.defaults();
            if (options.hasOwnProperty('fillStyle')) {
                this.context.fillStyle = options.fillStyle;
            }
        },

        defaults: function() {
            this.context.font = '20px "Helvetica", sans-serif';
            this.context.fillStyle = '#000';
        },
    };

    return TextRenderer;
});