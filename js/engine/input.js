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
                'down': false
            };
            this.bindEventHandlers();
        },

        bindEventHandlers: function() {
            document.addEventListener('keypress', this.handleKeypress.bind(this));
            document.addEventListener('keyup', this.handleKeyup.bind(this));
        },

        handleKeypress: function(event) {
            if (event.which == 32) {
                this.active_keys['space'] = true;
            }
        },

        handleKeyup: function(event) {
            if (event.which == 32) {
                this.active_keys['space'] = false;
            }  
        }
    };

    return Input;
})