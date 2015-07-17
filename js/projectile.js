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
                    down: 12.07,
                    up: 14
                }
            };
        },

        update: function(dt) {
            this.projectile.acceleration.x += this.projectile.starting_acceleration.x * dt;
            this.projectile.acceleration.y += this.projectile.starting_acceleration.y - Physics.ApplyGravity() * dt;

            this.projectile.velocity.x += this.projectile.acceleration.x;
            this.projectile.velocity.y += this.projectile.acceleration.y;

            this.projectile.x += this.projectile.velocity.x;
            this.projectile.y -= this.projectile.velocity.y;

            this.projectile.angle = Trig.toDegrees(Math.atan(this.projectile.velocity.y / this.projectile.velocity.x));

            if (this.projectile.velocity.x > 0) {
                if (Math.abs(this.projectile.velocity.x) >= this.projectile.terminal_velocity.down) {
                    this.projectile.velocity.x = this.projectile.terminal_velocity.down;
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

// console.log('dt', dt, 'y accel', this.projectile.acceleration.y, 'y vel', this.projectile.velocity.y);

            // this.projectile.acceleration.x = Math.min(this.projectile.max_acceleration, this.projectile.acceleration.x);

            // var direction = this.projectile.velocity.y / this.projectile.velocity.y;
            // if (Math.abs(this.projectile.acceleration.y) > Math.abs(this.projectile.max_acceleration)) {
            //     this.projectile.acceleration.y = this.projectile.max_acceleration * direction;
            // }

            // this.projectile.velocity.x += this.projectile.acceleration.x * dt;
            // this.projectile.velocity.y += this.projectile.acceleration.y * dt;

            // this.projectile.velocity.x = Math.min(this.projectile.terminal_velocity, this.projectile.velocity.x);

            // direction = this.projectile.velocity.y / this.projectile.velocity.y;
            // if (Math.abs(this.projectile.velocity.y) >= Math.abs(this.projectile.terminal_velocity)) {
            //     this.projectile.velocity.y = this.projectile.terminal_velocity * direction;
            // }

            // this.projectile.x += Trig.getXComponent(this.projectile.angle, this.projectile.velocity.x);
            // this.projectile.y -= Trig.getYComponent(this.projectile.angle, this.projectile.velocity.y);
        },

        render: function(projectile) {
            this.line(
                projectile.x, 
                projectile.y,
                projectile.x + Trig.getXComponent(projectile.angle, projectile.length), 
                projectile.y -Trig.getYComponent(projectile.angle, projectile.length),
                { lineWidth: projectile.thickness, strokeStyle: "#F30" }
            );
        },
        getArgs: function() {
            return this.projectile;
        }
    };

    return Projectile;
});