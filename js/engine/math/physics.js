define(['engine/math/trig'], function(Trig) {
    'use strict';

    return {
        ApplyGravity: function(angle) {
            return Trig.getYComponent(angle, 0.0009);
        }
    };
});