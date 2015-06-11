define(['engine/updateables', 'engine/renderables'], function(Updateables, Renderables) {
    'use strict';

    var GameController = function(renderer, input, performance_monitor, cannon) {
        this.renderer = renderer;
        this.performance_monitor = performance_monitor;

        this.total_time_running = 0;

        this.last_fame_time = +new Date();

        this.renderables = new Renderables();
        this.updateables = new Updateables();

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
                    args: cannon.getCannon()
                });
            }, this);

            document.addEventListener('keyup', this.handleKeyup.bind(this));

            this.update();
        },

        update: function() {
            var now = +new Date();
            var dt = now - this.last_fame_time;

            this.updateables.update(dt);

            if (this.input.isPressed('up')) {
                this.cannon.moveBy(dt, 0.07);
            }

            if (this.input.isPressed('down')) {
                this.cannon.moveBy(dt, -0.07);
            }

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

        move: function() {
            this.updateables.add({
                update: this.cannon.moveTo.bind(this.cannon),
                angle: 80,
                duration: 2500,
                total_time: 0
            });
        },

        handleKeyup: function(event) {
            if (event.which == 32) {
                
            }  
        },
    };

    return GameController;
});