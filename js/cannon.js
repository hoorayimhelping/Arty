define([], function() {
    'use strict';

    var Cannon = function() {
        this.cannon = {
            angle: 45,
            muzzle_velocity: 0,
            length: 75,
            thickness: 3,
            x: 200,
            y: 200,
            movement_speed: 0.07
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

        moveBy: function(dt, movement_direction) {
            movement_direction = movement_direction || 1;
            this.cannon.angle += movement_direction * this.cannon.movement_speed * dt;

            if (this.cannon.angle > 85) {
                this.cannon.angle = 85;
            }

            if (this.cannon.angle < 5) {
                this.cannon.angle = 5;
            }
        },

        update: function(dt) {

        },

        render: function(cannon) {
            var sin = Math.sin(Math.toRadians(cannon.angle));
            var cos = Math.cos(Math.toRadians(cannon.angle));

            this.context.lineWidth = cannon.thickness / 2;
            this.context.beginPath();
            this.context.arc(
                cannon.x + (cos * (cannon.length * 0.25)) + cannon.thickness,
                cannon.y - (sin * (cannon.length * 0.25)) + cannon.thickness * 2,
                cannon.length / 3 * 0.25,
                0,
                2 * Math.PI
            );
            this.context.stroke();
            this.context.closePath();

            this.context.beginPath();
            this.context.moveTo(cannon.x, cannon.y);
            this.context.lineTo(
                cannon.x + (cos * cannon.length), 
                cannon.y - (sin * cannon.length)
            );

            this.context.lineWidth = cannon.thickness;
            this.context.stroke();
            this.context.closePath();
        },

        getCannon: function() {
            return this.cannon;
        }
    };

    return Cannon;
});