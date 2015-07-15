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
                velocity: 0,
                acceleration: 0,
                starting_acceleration: 0,
                max_acceleration: 0.35,
                terminal_velocity: 10
            };
        },

        update: function(dt) {
            this.projectile.acceleration += this.projectile.starting_acceleration;
            this.projectile.acceleration = Math.min(this.projectile.max_acceleration, this.projectile.acceleration);

            this.projectile.velocity += this.projectile.acceleration * dt;
            this.projectile.velocity = Math.min(this.projectile.terminal_velocity, this.projectile.velocity);

            this.projectile.x += Trig.getXComponent(this.projectile.angle, this.projectile.velocity);
            this.projectile.y -= (Trig.getYComponent(this.projectile.angle, this.projectile.velocity) + Physics.ApplyGravity());
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