define(['engine/updateables', 'engine/renderables', 'engine/constants/world', 'engine/effects/explosion', 'engine/timed_movement'],
       function(Updateables, Renderables, GameWorld, Explosion, TimedMovement) {
    'use strict';

    var GameController = function(renderer, input, performance_monitor, cannon) {
        this.renderer = renderer;
        this.performance_monitor = performance_monitor;

        this.total_time_running = 0;

        this.last_frame_time = +new Date();

        this.projectiles = new Updateables();
        this.renderables = new Renderables();
        this.timed_movements = new TimedMovement(this.explosionsFilter.bind(this));

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

            this.cannon.update(dt, this.input);
            this.projectiles.update(dt);
            this.timed_movements.update(dt);

            this.detectCollisions();

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
                    projectile: projectile.context.getArgs(),
                    update: projectile.update.bind(projectile.context)
                });

                this.renderables.add({
                    render: projectile.render.bind(this.renderer),
                    args: projectile.getArgs()
                });
            }
        },

        detectCollisions: function() {
            this.projectiles.filter(function(item) {
                if (item.hasOwnProperty('projectile') &&
                    item.projectile.position.y >= GameWorld.Ground()) {

                    this.createExplosion({ x: item.projectile.position.x, y: GameWorld.Ground() });

                    return false;
                }

                return true;
            }.bind(this));
        },

        createExplosion: function(coords) {
            var explosion = Explosion.CreateAtCoords(coords);

            this.timed_movements.create({
                id: explosion.id,
                total_time: 0,
                duration: explosion.animation_duration,
                update: explosion.update.bind(explosion)
            });

            this.renderables.add({
                id: explosion.id,
                render: explosion.render.bind(this.renderer),
                args: explosion.getArgs()
            });
        },

        explosionsFilter: function(explosion) {
            if (explosion.total_time >= explosion.duration) {
                this.renderables.filter(function(renderable) {

                    if (renderable.hasOwnProperty('id') &&
                        renderable.id === explosion.id) {
                        return false;
                    }

                    return true;
                }.bind(this));
                
                return false;
            }

            return true;
        }
    };

    return GameController;
});