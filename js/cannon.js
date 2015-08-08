define(['engine/math/trig'], function(Trig) {
    'use strict';

    var getCannonTipX = function(cannon) {
        return cannon.position.x + Trig.getXComponent(cannon.angle, cannon.barrel_length);
    };

    var getCannonTipY = function(cannon) {
        return cannon.position.y -Trig.getYComponent(cannon.angle, cannon.barrel_length);
    };

    var Cannon = function(projectile) {
        this.projectile = projectile;

        this.active_projectile_id = 0;

        this.cannon = {
            angle: 45,
            max_angle: 70,
            min_angle: 20,
            muzzle_velocity: {
                current: 0.000905,
                max: 0.0015,
                min: 0.000785,
                step: 0.0000005
            },
            barrel_length: 25,
            thickness: 3,
            position: {
                x: 0,
                y: 0
            },
            movement_speed: 0.07,
        };
    };

    Cannon.prototype = {
        moveTo: function(dt, angle, time_left) {
            if (time_left > 0) {
                var distance_to_angle = Math.abs(angle - this.cannon.angle);
                var distance_increase_step = distance_to_angle / time_left;

                this.cannon.angle += distance_increase_step * dt;
            }

            if (this.cannon.angle >= angle) {
                this.cannon.angle = angle;
            }
        },

        moveBy: function(dt) {
            this.cannon.angle += this.cannon.movement_speed * dt;

            if (this.cannon.angle > this.cannon.max_angle) {
                this.cannon.angle = this.cannon.max_angle;
            }

            if (this.cannon.angle < this.cannon.min_angle) {
                this.cannon.angle = this.cannon.min_angle;
            }
        },

        scaleMuzzleVelocity: function(dt) {
            this.cannon.muzzle_velocity.current += this.cannon.muzzle_velocity.step * dt;

            if (this.cannon.muzzle_velocity.current > this.cannon.muzzle_velocity.max) {
                this.cannon.muzzle_velocity.current = this.cannon.muzzle_velocity.max;
            }

            if (this.cannon.muzzle_velocity.current < this.cannon.muzzle_velocity.min) {
                this.cannon.muzzle_velocity.current = this.cannon.muzzle_velocity.min;
            }
        },

        update: function(dt, input) {
            if (input.isPressed('up')) {
                this.moveBy(dt);
            }

            if (input.isPressed('down')) {
                this.moveBy(-dt);
            }

            if (input.isPressed('right')) {
                this.scaleMuzzleVelocity(dt);
            }

            if (input.isPressed('left')) {
                this.scaleMuzzleVelocity(-dt);
            }
        },

        fire: function() {
            this.projectile.init();

            this.projectile.projectile.position.x = this.cannon.position.x;
            this.projectile.projectile.position.y = this.cannon.position.y;
            this.projectile.projectile.angle = this.cannon.angle;
            this.projectile.projectile.acceleration.x = Trig.getXComponent(this.cannon.angle, this.cannon.muzzle_velocity.current);
            this.projectile.projectile.acceleration.y = Trig.getYComponent(this.cannon.angle, this.cannon.muzzle_velocity.current);
            this.projectile.projectile.barrel_tip.x = getCannonTipX(this.cannon);
            this.projectile.projectile.barrel_tip.y = getCannonTipY(this.cannon);

            this.active_projectile_id = this.projectile.id;

            return {
                update: this.projectile.update,
                render: this.projectile.render,
                context: this.projectile,
                getArgs: this.projectile.getArgs.bind(this.projectile)
            };
        },

        render: function(cannon) {
            // draw barrel
            this.line(
                cannon.position.x,
                cannon.position.y,
                getCannonTipX(cannon),
                getCannonTipY(cannon),
                { lineWidth: cannon.thickness }
            );
        },

        getArgs: function() {
            return this.cannon;
        }
    };

    return Cannon;
});