define(['engine/math/trig'], function(Trig) {
    'use strict';

    var Cannon = function(projectile) {
        this.projectile = projectile;

        this.cannon = {
            angle: 45,
            muzzle_velocity: 0,
            length: 75,
            thickness: 3,
            x: 200,
            y: 200,
            movement_speed: 0.07 // heh took a few days to notice james bond movement speed
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

        moveBy: function(amount) {
            this.cannon.angle += amount;

            if (this.cannon.angle > 85) {
                this.cannon.angle = 85;
            }

            if (this.cannon.angle < 5) {
                this.cannon.angle = 5;
            }
        },

        update: function(dt, input) {
            if (input.isPressed('up')) {
                this.moveBy(this.cannon.movement_speed * dt);
            }

            if (input.isPressed('down')) {
                this.moveBy(-this.cannon.movement_speed * dt);
            }
        },

        fire: function() {
            return {
                update: this.projectile.update,
                render: this.projectile.render,
                context: this.projectile
            };
        },

        render: function(cannon) {
            this.circle(
                cannon.x + cannon.thickness + (Trig.getXComponent(cannon.angle, cannon.length) * 0.05),
                cannon.y - (Trig.getYComponent(cannon.angle, cannon.length) * 0.05) + (cannon.thickness),
                cannon.length / 3 * 0.25,
                cannon.thickness / 2
            );

            this.line(
                cannon.x, 
                cannon.y,
                cannon.x + Trig.getXComponent(cannon.angle, cannon.length), 
                cannon.y -Trig.getYComponent(cannon.angle, cannon.length),
                { lineWidth: cannon.thickness }
            );
        },

        getArgs: function() {
            return this.cannon;
        }
    };

    return Cannon;
});