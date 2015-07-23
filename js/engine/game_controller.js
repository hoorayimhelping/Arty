define(['engine/timed_movement', 'engine/updateables', 'engine/renderables'], function(TimedMovement, Updateables, Renderables) {
    'use strict';

    var GameController = function(renderer, input, performance_monitor, cannon) {
        this.renderer = renderer;
        this.performance_monitor = performance_monitor;

        this.total_time_running = 0;

        this.last_fame_time = +new Date();

        this.updateables = new Updateables();
        this.renderables = new Renderables();
        this.timed_movements = new TimedMovement();

        this.input = input;

        this.cannon = cannon;
    };

    GameController.prototype = {
        init: function() {
            this.renderer.init();
            this.input.init();
            this.performance_monitor.init();

            [this.cannon].forEach(function(cannon) {
                this.renderables.add({
                    render: cannon.render.bind(this.renderer),
                    args: cannon.getArgs()
                });
            }, this);

            document.addEventListener('keyup', this.handleKeyup.bind(this));

            this.update();
        },

        update: function() {
            var now = +new Date();
            var dt = now - this.last_fame_time;

            this.updateables.update(dt);
            this.cannon.update(dt, this.input);

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
        },

        handleKeyup: function(event) {
            if (event.which == 32) {
                this.updateables.filter(function(updateable) {
                    if (typeof updateable === 'function' &&
                        updateable.hasOwnProperty('projectile') &&
                        updateable.projectile.id === this.cannon.active_projectile.id) {
                        return false;
                    }
                });

                var projectile = this.cannon.fire();

                this.updateables.add({
                    update: projectile.update.bind(projectile.context)
                });

                this.renderables.add({
                    render: projectile.render.bind(this.renderer),
                    args: projectile.getArgs()
                });
            }  
        },
    };

    return GameController;
});