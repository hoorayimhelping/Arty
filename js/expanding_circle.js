define([], function() {
    'use strict';

    var ExpandingCircle = function(circle, animation_duration) {
        this.circle = circle;
        this.animation_duration = animation_duration;
    };

    ExpandingCircle.prototype = {
        init: function() {
            this.total_animation_time = 0;
        },

        update: function(dt) {
            var time_left = this.animation_duration - this.total_animation_time;
            if (time_left > 0) {
                var distance_to_radius = this.circle.desired_radius - this.circle.current_radius;
                var radius_increase_step = distance_to_radius / time_left;

                this.circle.current_radius += radius_increase_step * dt;
            }

            if (this.circle.current_radius >= this.circle.desired_radius) {
                this.circle.current_radius = this.circle.desired_radius;
            }

            this.total_animation_time += dt;
        },

        render: function(circle) {
            this.context.strokeStyle = circle.color;
            this.context.beginPath();
            this.context.arc(circle.x, circle.y, circle.current_radius, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.closePath();
        }
    };

    var randomByteInt = function() {
        return Math.floor(Math.random() * 256);
    }

    ExpandingCircle.CreateAtCoords = function(coords) {
        var circle = new ExpandingCircle({
            x: coords.x,
            y: coords.y,
            current_radius: 0,
            desired_radius: 15 + Math.ceil(Math.random() * 100),
            color: 'rgb(' + randomByteInt() + ',' + randomByteInt() + ',' + randomByteInt() + ')'
        }, 500 + Math.ceil(Math.random() * 2000));

        circle.init();

        return circle;
    }

    return ExpandingCircle;
});