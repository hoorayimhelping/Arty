define([], function() {
    'use strict';

    var TimedMovement = function(timed_movements) {
        this.timed_movements = timed_movements || [];
    };

    TimedMovement.prototype = {
        create: function(updateable) {
            this.timed_movements.push(updateable);
        },

        update: function(dt) {
            this.timed_movements
            .filter(function(updateable) {
                return updateable.total_time < updateable.duration;
            })
            .map(function(updateable) {
                var time_left = updateable.duration - updateable.total_time;
                updateable.update(dt, updateable.angle, time_left);
                updateable.total_time += dt;
            });
        }
    };

    return TimedMovement;
});