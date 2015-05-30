define([], function() {
    var GameController = function(canvas_element, renderer) {
        this.$canvas = canvas_element;
        this.renderer = renderer;

        this.last_fame_time = +new Date();

        this.arbitrary_circle = {
            x: 200,
            y: 200,
            current_radius: 0,
            desired_radius: 100
        }
    };

    GameController.prototype = {
        init: function() {
            this.context = this.$canvas.getContext('2d');

            this.update();
        },

        update: function(dt) {
            var now = +new Date();
            var dt = now - this.last_fame_time;

            this.render(dt);

            this.last_fame_time = now;
            requestAnimationFrame(this.update.bind(this));
        },

        render: function(dt) {
            this.context.clearRect(0, 0, this.$canvas.clientWidth, this.$canvas.clientHeight);
            this.renderer.expandingCircle(this.arbitrary_circle, 1000, dt)
        }
    };

    return GameController;
});