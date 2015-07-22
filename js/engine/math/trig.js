define([], function() {
    'use strict';

    return {
        getXComponent: function(angle, length) {
            length = length || 1;
            return Math.cos(this.toRadians(angle)) * length;
        },

        getYComponent: function(angle, length) {
            length = length || 1;
            return Math.sin(this.toRadians(angle)) * length;
        },

        toRadians: function(angle) {
            return (Math.PI / 180) * angle;
        },

        toDegrees: function(angle) {
            return (180 / Math.PI) * angle;
        }
    };
});