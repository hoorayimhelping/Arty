define(['updateables', 'renderables', 'expanding_circle'], function(Updateables, Renderables, ExpandingCircle) {
    'use strict';

    var explosion = function(coords) {
        var circle = new ExpandingCircle({
            x: coords.x,
            y: coords.y,
            current_radius: 0,
            desired_radius: 15 + Math.ceil(Math.random() * 100)
        }, 500 + Math.ceil(Math.random() * 2000));

        circle.init();

        this.updateables.add({
            update: circle.update,
            context: circle
        });

        this.renderables.add({
            render: circle.render,
            args: [circle.circle]
        });
    }

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


        this.renderables = new Renderables(this.renderer, [{render: this.expanding_circle.render, args: [this.expanding_circle.circle]}]);
        this.updateables = new Updateables([{update: this.expanding_circle.update, context: this.expanding_circle}]);
    };

    GameController.prototype = {
        init: function() {
            this.context = this.$canvas.getContext('2d');

            this.expanding_circle.init();

            this.renderer.init();
            this.performance_monitor.init();

            this.update();
        },

        explosion: function(coords) {
            explosion.bind(this)(coords);
        },

        update: function() {
            var now = +new Date();
            var dt = now - this.last_fame_time;

            this.updateables.update(dt);

            this.render(dt);
            this.performance_monitor.update(dt);

            this.total_time_running += dt;

            // don't put anything below this
            this.last_fame_time = now;
            requestAnimationFrame(this.update.bind(this));
        },

        render: function(dt) {
            this.renderer.render(dt);
            this.renderables.render()
        }
    };

    return GameController;
});