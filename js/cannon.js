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
            var sin = Math.sin(Math.toRadians(cannon.angle));
            var cos = Math.cos(Math.toRadians(cannon.angle));

            this.context.beginPath();
            this.context.arc(
                cannon.x + (cos * (cannon.length * .25)) + cannon.thickness,
                cannon.y - (sin * (cannon.length * .25)) + cannon.thickness * 2,
                cannon.length / 3 * .25,
                0,
                2 * Math.PI
            );
            this.context.moveTo(cannon.x, cannon.y);
            this.context.lineTo(
                cannon.x + (cos * cannon.length), 
                cannon.y - (sin * cannon.length)
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