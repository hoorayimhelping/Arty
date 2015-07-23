define([], function() {
    'use strict';

    var Explosion = function(explosion, animation_duration) {
        this.explosion = explosion;
        this.animation_duration = animation_duration;
    };

    Explosion.prototype = {
        init: function() {
            this.total_animation_time = 0;
            this.time_left = this.animation_duration;
        },

        update: function(dt) {
            this.time_left = this.animation_duration - this.total_animation_time;
            if (this.time_left > 0) {
                var distance_to_radius = this.explosion.desired_radius - this.explosion.current_radius;
                var radius_increase_step = distance_to_radius / this.time_left;

                this.explosion.current_radius += radius_increase_step * dt;
            }

            if (this.explosion.current_radius >= this.explosion.desired_radius) {
                this.explosion.current_radius = this.explosion.desired_radius;
            }

            this.total_animation_time += dt;
        },

        render: function(explosion) {
            this.explosion(explosion.x, explosion.y, explosion.current_radius, { strokeStyle: explosion.color });
        }
    };

    var randomByteInt = function() {
        return Math.floor(Math.random() * 256);
    };

    Explosion.CreateAtCoords = function(coords) {
        var explosion = new Explosion({
            x: coords.x,
            y: coords.y,
            current_radius: 0,
            desired_radius: 15 + Math.ceil(Math.random() * 100),
            color: 'rgb(' + randomByteInt() + ',' + randomByteInt() + ',' + randomByteInt() + ')'
        }, 200 + Math.ceil(Math.random() * 2000));

        explosion.init();

        return explosion;
    };

    return Explosion;
});