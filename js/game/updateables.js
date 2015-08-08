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
            this.updateables.map(function(updateable) {
                updateable.update(dt);
            }, this);
        },

        filter: function(fn) {
            this.updateables = this.updateables.filter(fn);
        }
    };

    return Updateables;
});