define(['engine/updateables', 'engine/renderables'], function(Updateables, Renderables) {
    'use strict';

    var GameController = function(renderer, input, performance_monitor, cannons) {
        this.renderer = renderer;
        this.performance_monitor = performance_monitor;

        this.total_time_running = 0;

        this.last_fame_time = +new Date();

        this.renderables = new Renderables();
        this.updateables = new Updateables();

        this.input = input;

        this.cannons = cannons;
    };

    GameController.prototype = {
        init: function() {
            this.renderer.init();
            this.input.init();
            this.performance_monitor.init();

            this.cannons.forEach(function(cannon) {
                this.renderables.add({
                    render: cannon.render.bind(this.renderer),
                    args: cannon.getCannon()
                });
            }, this);

            this.update();
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
            this.renderer.render();

            this.performance_monitor.render();
            this.renderables.render();
        }
    };

    return GameController;
});