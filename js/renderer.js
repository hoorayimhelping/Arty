define([], function() {
    var Renderer = function(context) {
        this.context = context;
    };

    Renderer.prototype = {
        init: function() {
            this.context.fillStyle = "#000";
            this.context.strokeStyle = "#FFF";
        },

        render: function() {
            this.context.fillRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);
        }
    };

    return Renderer;
});