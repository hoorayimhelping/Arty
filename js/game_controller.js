define(['renderables', 'expanding_circle'], function(Renderables, ExpandingCircle) {
    var GameController = function(canvas_element, renderer, performance_monitor) {
        this.$canvas = canvas_element;
        this.renderer = renderer;
        this.performance_monitor = performance_monitor;

        this.total_time_running = 0;

        this.last_fame_time = +new Date();

        this.expanding_circle = new ExpandingCircle({
            x: 200,
            y: 200,
            current_radius: 0,
            desired_radius: 100
        }, 1000);

        this.renderables = new Renderables(this.renderer, [{fn: this.expanding_circle.render, args: [this.expanding_circle.circle]}]);
    };

    GameController.prototype = {
        init: function() {
            this.context = this.$canvas.getContext('2d');

            this.expanding_circle.init();

            this.renderer.init();
            this.performance_monitor.init();

            this.update();
        },

        update: function() {
            var now = +new Date();
            var dt = now - this.last_fame_time;

            this.expanding_circle.update(dt);

            this.render(dt);
            this.performance_monitor.update(dt);

            this.total_time_running += dt;

            // don't put anything below this
            this.last_fame_time = now;
            requestAnimationFrame(this.update.bind(this));
        },

        render: function(dt) {
            this.context.clearRect(0, 0, this.$canvas.clientWidth, this.$canvas.clientHeight);
            this.renderables.render()
        }
    };

    return GameController;
});