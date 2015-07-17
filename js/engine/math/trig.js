define([], function() {
    'use strict';

    return {
        getXComponent: function(angle, length) {
            return this.getComponent('x', angle, length);
        },

        getYComponent: function(angle, length) {
            return this.getComponent('y', angle, length);
        },

        getComponent: function(component, angle, length) {
            if (component === 'y') {
                return Math.sin(this.toRadians(angle)) * length;
            } else {
                return Math.cos(this.toRadians(angle)) * length;
            }
        },

        toRadians: function(angle) {
            return (Math.PI / 180) * angle;
        },

        toDegrees: function(angle) {
            return (180 / Math.PI) * angle;
        }
    };
});