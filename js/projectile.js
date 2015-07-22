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
                terminal_velocity: 11,
                barrel_tip: {
                    x: 0,
                    y: 0
                }
            };
        },

        update: function(dt) {
            if (this.projectile.x >= this.projectile.barrel_tip.x &&
                this.projectile.y <= this.projectile.barrel_tip.y) {
                this.projectile.acceleration.y -= Physics.ApplyGravity();
            }

            this.projectile.velocity.x += dt * this.projectile.acceleration.x;
            this.projectile.velocity.y += dt * this.projectile.acceleration.y;

            this.projectile.x += dt * (this.projectile.velocity.x + (dt * this.projectile.acceleration.x / 2));
            this.projectile.y -= dt * (this.projectile.velocity.y + (dt * this.projectile.acceleration.y / 2));

            this.projectile.angle = Trig.toDegrees(Math.atan(this.projectile.velocity.y / this.projectile.velocity.x));
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