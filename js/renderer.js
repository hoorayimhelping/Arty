define([], function() {
    var Renderer = function(context) {
        this.context = context;
    };

    Renderer.prototype = {
        init: function() {
            this.total_animation_time = 0;
        },

        expandingCircle: function(circle, animation_duration, dt) {
            var time_left = animation_duration - this.total_animation_time;
            if (time_left > 0) {
                var distance_to_radius = circle.desired_radius - circle.current_radius;
                var radius_increase_step = distance_to_radius / time_left;

                circle.current_radius += radius_increase_step;   
            }

            this.context.beginPath();
            this.context.arc(circle.x, circle.y, circle.current_radius, 0, 2 * Math.PI);
            this.context.stroke();

            this.total_animation_time += dt;
        }
    };

    return Renderer;
});