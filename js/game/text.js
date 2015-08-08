define([], function() {
    'use strict';

    var Text = function(text, coords) {
        this.text = {
            text: text,
            coords: coords
        };
    };

    Text.prototype = {
        renderText: function(text, options) {
            options = options || {};
            this.context.font = '20px "Helvetica", sans-serif';
            this.context.fillStyle = '#000';

            if (options.hasOwnProperty('fillStyle')) {
                this.context.fillStyle = options.fillStyle;
            }

            this.context.fillText(text.text, text.coords.x, text.coords.y);
        },

        getArgs: function() {
            return this.text;
        }
    };
    return Text;
});