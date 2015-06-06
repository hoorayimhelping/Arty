define([], function() {
    'use strict';

    var Cannon = function() {
        this.cannon = {
            angle: 45,
            muzzle_velocity: 0,
            length: 75,
            thickness: 3,
            x: 200,
            y: 200,
        };
    };

    Cannon.prototype = {
        render: function(cannon) {
            this.context.beginPath();
            this.context.moveTo(cannon.x, cannon.y);
            this.context.lineTo(
                cannon.x + Math.cos(Math.toRadians(cannon.angle)) * cannon.length, 
                cannon.y - Math.sin(Math.toRadians(cannon.angle)) * cannon.length
            );
            this.context.lineWidth = cannon.thickness;
            this.context.closePath();
            this.context.stroke();
        },


        getCannon: function() {
            return this.cannon;
        }
    };

    return Cannon;
});