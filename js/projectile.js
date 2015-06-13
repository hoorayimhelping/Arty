define(['engine/math/trig'], function(Trig) {
    'use strict';

    var Projectile = function() {

        this.projectile = {
        };
    };

    Projectile.prototype = {
        update: function(dt) {},
        render: function(projectile) {},
        getArgs: function() {
            return this.projectile;
        }
    };

    return Projectile;
});