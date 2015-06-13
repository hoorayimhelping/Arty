define([], function() {
    'use strict';

    var Renderer = function(context) {
        this.context = context;
    };

    Renderer.prototype = {
        init: function() {
            this.context.fillStyle = "#FFF";
            this.context.strokeStyle = "#000";
        },

        render: function() {
            this.context.fillRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);
        },

        circle: function(x, y, radius, thickness) {
            this.context.lineWidth = thickness;
            this.context.beginPath();
            this.context.arc(x, y, radius, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.closePath();
        },

        line: function(start_x, start_y, end_x, end_y, thickness) {
            this.context.stroke();
            this.context.closePath();

            this.context.beginPath();
            this.context.moveTo(start_x, start_y);
            this.context.lineTo(
                end_x,
                end_y
            );

            this.context.lineWidth = thickness;
            this.context.stroke();
            this.context.closePath();
        }
    };

    return Renderer;
});