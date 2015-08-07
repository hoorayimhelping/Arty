define([], function() {
    'use strict';

    var Input = function($canvas) {
        this.$canvas = $canvas;
        this.active_keys = {};
    };

    Input.prototype = {
        init: function() {
            this.active_keys = {
                'space': false,
                'up': false,
                'down': false,
                'right': false,
                'left': false
            };
            this.bindEventHandlers();
        },

        isPressed: function(key) {
            return this.active_keys.hasOwnProperty(key) && this.active_keys[key];
        },

        bindEventHandlers: function() {
            document.addEventListener('keydown', this.handleKeypress.bind(this));
            document.addEventListener('keyup', this.handleKeyup.bind(this));
        },

        handleKeypress: function(event) {
            if (event.which == 32) {
                this.active_keys.space = true;
            }

            if (event.which == 38) {
                this.active_keys.up = true;
            }

            if (event.which == 40) {
                this.active_keys.down = true;
            }

            if (event.which == 39) {
                this.active_keys.right = true;
            }

            if (event.which == 37) {
                this.active_keys.left = true;
            }
        },

        handleKeyup: function(event) {
            if (event.which == 32) {
                this.active_keys.space = false;
            }

            if (event.which == 38) {
                this.active_keys.up = false;
            }

            if (event.which == 40) {
                this.active_keys.down = false;
            }

            if (event.which == 39) {
                this.active_keys.right = false;
            }

            if (event.which == 37) {
                this.active_keys.left = false;
            }
        }
    };

    return Input;
});