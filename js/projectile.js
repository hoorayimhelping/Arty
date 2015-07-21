define(['engine/math/trig', 'engine/math/physics'], function(Trig, Physics) {
    'use strict';

    var Projectile = function() {
        this.projectile = {};
    };

    Projectile.prototype = {
        init: function() {
            this.projectile = {
                angle: 0,
                x: 200,
                y: 200,
                length: 10,
                thickness: 2,
                color: '#F30',
                velocity: {
                    x: 0,
                    y: 0
                },
                acceleration: {
                    x: 0,
                    y: 0
                },
                starting_acceleration: {
                    x: 0,
                    y: 0
                },
                terminal_velocity: {
                    down: 11,
                    up: 11,
                    forward: 11
                }
            };
        },

        update: function(dt) {
            this.projectile.acceleration.x += Trig.getXComponent(this.projectile.angle, this.projectile.starting_acceleration.x) * dt;
            this.projectile.acceleration.y += Trig.getYComponent(this.projectile.angle, this.projectile.starting_acceleration.y) * dt;
            this.projectile.acceleration.y -= Physics.ApplyGravity(this.projectile.angle) * dt;

            this.projectile.velocity.x += this.projectile.acceleration.x;
            this.projectile.velocity.y += this.projectile.acceleration.y;

            this.projectile.x += this.projectile.velocity.x;
            this.projectile.y -= this.projectile.velocity.y;

            this.projectile.angle = Trig.toDegrees(Math.atan(this.projectile.velocity.y / this.projectile.velocity.x));

            if (this.projectile.velocity.x > 0) {
                if (Math.abs(this.projectile.velocity.x) >= this.projectile.terminal_velocity.forward ) {
                    this.projectile.velocity.x = this.projectile.terminal_velocity.forward;
                    this.projectile.acceleration.x = 0;
                    this.projectile.starting_acceleration.x = 0;
                }
            }

            // falling
            if (this.projectile.velocity.y < 0) {
                if (Math.abs(this.projectile.velocity.y) >= this.projectile.terminal_velocity.down) {
                    this.projectile.velocity.y = -this.projectile.terminal_velocity.down;
                    this.projectile.acceleration.y = 0;
                    this.projectile.starting_acceleration.y = 0;
                }
            // rising
            } else {
                if (Math.abs(this.projectile.velocity.y) >= this.projectile.terminal_velocity.up) {
                    this.projectile.velocity.y = this.projectile.terminal_velocity.up;
                    this.projectile.acceleration.y = 0;
                    this.projectile.starting_acceleration.y = 0;
                }
            }
        },

        render: function(projectile) {
            this.line(
                projectile.x, 
                projectile.y,
                projectile.x + Trig.getXComponent(projectile.angle, projectile.length), 
                projectile.y -Trig.getYComponent(projectile.angle, projectile.length),
                { lineWidth: projectile.thickness, strokeStyle: projectile.color }
            );
        },
        getArgs: function() {
            return this.projectile;
        }
    };

    return Projectile;
});