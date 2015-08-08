define(['game/updateables', 'game/renderables', 'engine/effects/explosion', 'game/timed_movement', 'game/text'],
       function(Updateables, Renderables, Explosion, TimedMovement, Text) {
    'use strict';

    var GameController = function(world, renderer, input, performance_monitor, cannon) {
        this.world = world;
        this.renderer = renderer;
        this.performance_monitor = performance_monitor;

        this.total_time_running = 0;

        this.last_frame_time = +new Date();

        this.projectiles = new Updateables();
        this.renderables = new Renderables();
        this.timed_movements = new TimedMovement(this.explosionsFilter.bind(this));

        this.power_text = new Text('Power: ', { x: 0, y: 20 });
        this.angle_text = new Text('Angle: ', { x: 0, y: 40 });

        this.input = input;

        this.cannon = cannon;
    };

    GameController.prototype = {
        init: function() {
            this.renderer.init();
            this.input.init();
            this.performance_monitor.init();

            [this.cannon].forEach(function(cannon, i) {
                this.renderables.add({
                    id: 'cannon_' + i,
                    render: cannon.render.bind(this.renderer),
                    args: cannon.getArgs()
                });
            }, this);

            this.power_text.update = function(dt, power) {
                this.text.text = 'Power: ' + power;
            }.bind(this.power_text);

            this.angle_text.update = function(dt, angle) {
                this.text.text = 'Angle: ' + angle;
            }.bind(this.angle_text);

            this.renderables.add({
                id: 'power_text',
                render: this.power_text.renderText.bind(this.renderer),
                args: this.power_text.getArgs()
            });

            this.renderables.add({
                id: 'angle_text',
                render: this.angle_text.renderText.bind(this.renderer),
                args: this.angle_text.getArgs()
            });

            document.addEventListener('keyup', this.handleKeyup.bind(this));

            this.update();
        },

        update: function() {
            var now = +new Date();
            var dt = now - this.last_frame_time;

            this.cannon.update(dt, this.input);
            this.power_text.update(dt, (this.cannon.getArgs().muzzle_velocity.current * 1000).toFixed(3));
            this.angle_text.update(dt, this.cannon.getArgs().angle.toFixed(2) + "°");
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
                for (var i = 0; i < this.projectiles.updateables.length; i++) {
                    var traveling_projectile = this.projectiles.updateables[i];
                    if (traveling_projectile.hasOwnProperty('id') &&
                        traveling_projectile.id === this.cannon.active_projectile_id) {
                        return false;
                    }
                }

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
                    item.projectile.position.y >= this.world.Ground()) {

                    this.createExplosion({ x: item.projectile.position.x, y: this.world.Ground() });

                    return false;
                }

                return true;
            }.bind(this));
        },

        createExplosion: function(coords) {
            var explosion = Explosion.CreateAtCoords(coords);

            this.timed_movements.create({
                id: explosion.id,
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