define(['engine/updateables', 'engine/renderables'], function(Updateables, Renderables) {
    'use strict';

    var GameController = function(renderer, input, performance_monitor, cannon) {
        this.renderer = renderer;
        this.performance_monitor = performance_monitor;

        this.total_time_running = 0;

        this.last_frame_time = +new Date();

        this.projectiles = new Updateables();
        this.renderables = new Renderables();

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
            var dt = now - this.last_frame_time;

            this.projectiles.update(dt);
            this.cannon.update(dt, this.input);

            this.render(dt);
            this.performance_monitor.update(dt);

            this.total_time_running += dt;

            // don't put anything below this
            this.last_frame_time = now;
            requestAnimationFrame(this.update.bind(this));
        },

        render: function(dt) {
            this.renderer.render();

            this.performance_monitor.render();
            this.renderables.render();
        },

        handleKeyup: function(event) {
            // spacebar was pressed
            if (event.which == 32) {
                this.projectiles.filter(function(item) {
                    if (item.hasOwnProperty('id') &&
                        item.id === this.cannon.active_projectile_id) {
                        return false;
                    }
                    return true;
                }.bind(this));

                var projectile = this.cannon.fire();

                this.projectiles.add({
                    id: projectile.context.id,
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