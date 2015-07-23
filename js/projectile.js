define(['engine/math/trig', 'engine/math/physics', 'engine/constants/world'], function(Trig, Physics, World) {
    'use strict';

    var Projectile = function() {
        this.projectile = {};
    };

    Projectile.prototype = {
        init: function() {
            this.id = Date.now();

            this.projectile = {
                angle: 0,
                length: 10,
                thickness: 2,
                color: '#F30',
                position: {
                    x: 0,
                    y: 0
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                acceleration: {
                    x: 0,
                    y: 0
                },
                barrel_tip: {
                    x: 0,
                    y: 0
                }
            };
        },

        update: function(dt, updateables) {
            if (this.projectile.position.x >= this.projectile.barrel_tip.x &&
                this.projectile.position.y <= this.projectile.barrel_tip.y) {
                this.projectile.acceleration.y -= Physics.ApplyGravity();
            }

            this.projectile.velocity.x += dt * this.projectile.acceleration.x;
            this.projectile.velocity.y += dt * this.projectile.acceleration.y;

            this.projectile.position.x += dt * (this.projectile.velocity.x + (dt * this.projectile.acceleration.x / 2));
            this.projectile.position.y -= dt * (this.projectile.velocity.y + (dt * this.projectile.acceleration.y / 2));

            this.projectile.angle = Trig.toDegrees(Math.atan(this.projectile.velocity.y / this.projectile.velocity.x));

            if (this.projectile.position.y >= World.ground()) {
                updateables.filter(this.filter);
            }
        },

        render: function(projectile) {
            this.line(
                projectile.position.x, 
                projectile.position.y,
                projectile.position.x + Trig.getXComponent(projectile.angle, projectile.length),
                projectile.position.y -Trig.getYComponent(projectile.angle, projectile.length),
                { lineWidth: projectile.thickness, strokeStyle: projectile.color }
            );
        },

        getArgs: function() {
            return this.projectile;
        },

        filter: function(projectile) {
            if (typeof projectile === 'function' &&
                projectile.hasOwnProperty('projectile') &&
                projectile.projectile.id === this.projectile.id) {

                return false;
            }
        }
    };

    return Projectile;
});