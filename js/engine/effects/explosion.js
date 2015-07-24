define([], function() {
    'use strict';

    var randomByteInt = function() {
        return Math.floor(Math.random() * 256);
    };

    var Explosion = function(circle, animation_duration) {
        this.id = Date.now();

        this.circle = circle || {
            x: 0,
            y: 0,
            current_radius: 0,
            desired_radius: 15 + Math.ceil(Math.random() * 50),
            color: 'rgb(' + randomByteInt() + ',' + randomByteInt() + ',' + randomByteInt() + ')'
        };
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
                var distance_to_radius = this.circle.desired_radius - this.circle.current_radius;
                var radius_increase_step = distance_to_radius / this.time_left;

                this.circle.current_radius += radius_increase_step * dt;
            }

            if (this.circle.current_radius >= this.circle.desired_radius) {
                this.circle.current_radius = this.circle.desired_radius;
            }

            this.total_animation_time += dt;
        },

        render: function(circle) {
            this.circle(circle.x, circle.y, circle.current_radius, { strokeStyle: circle.color });
        },

        getArgs: function() {
            return this.circle;
        }
    };

    Explosion.CreateAtCoords = function(coords) {
        var circle = new Explosion({
            x: coords.x,
            y: coords.y,
            current_radius: 0,
            desired_radius: 15 + Math.ceil(Math.random() * 50),
            color: 'rgb(' + randomByteInt() + ',' + randomByteInt() + ',' + randomByteInt() + ')'
        }, 200 + Math.ceil(Math.random() * 2000));

        circle.init();

        return circle;
    };

    return Explosion;
});