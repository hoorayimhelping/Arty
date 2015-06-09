define([], function() {
    'use strict';

    var Updateables = function(updateables) {
        this.updateables = updateables || [];
    };

    Updateables.prototype = {
        add: function(updateable) {
            this.updateables.push(updateable);
        },

        update: function(dt) {
            this.updateables
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

    return Updateables;
});