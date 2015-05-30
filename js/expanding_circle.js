define([], function() {
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
            this.context.beginPath();
            this.context.arc(circle.x, circle.y, circle.current_radius, 0, 2 * Math.PI);
            this.context.stroke();
        }
    };

    return ExpandingCircle;
});