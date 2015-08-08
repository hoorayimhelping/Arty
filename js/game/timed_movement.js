define([], function() {
    'use strict';

    var TimedMovement = function(filter) {
        this.timed_movements = [];
        this.filter = filter || function() { return true; };
    };

    TimedMovement.prototype = {
        create: function(updateable) {
            updateable.total_time = 0;
            this.timed_movements.push(updateable);
        },

        update: function(dt) {
            this.timed_movements
            .filter(this.filter)
            .map(function(updateable) {
                var time_left = updateable.duration - updateable.total_time;
                // check out explosion::update
                updateable.update(dt, updateable.angle, time_left);
                updateable.total_time += dt;
            });
        }
    };

    return TimedMovement;
});