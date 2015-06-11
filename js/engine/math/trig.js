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
                return Math.sin(Math.toRadians(angle)) * length;
            } else {
                return Math.cos(Math.toRadians(angle)) * length;
            }
        }
    };
});