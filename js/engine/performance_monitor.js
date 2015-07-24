define([], function() {
    'use strict';

    /**
     * Instantiates Performance Stats. Creates a child p element of $element
     * @param HTMLElement $element: The HTML Element to draw the stats into
     */
    var Performance = function($element) {
        this.$element = $element;
    };

    Performance.prototype.init = function() {
      this.fps = 0;
      this.elapsedTime = 201;
      this.frames = 0;

      this.render();
    };

    /**
     * Updates the stats based on the change in milliseconds
     *
     * @param Number dt: Number of miliseconds since last frame was rendered
     */
    Performance.prototype.update = function(dt) {
      this.elapsedTime += dt;
      this.fps += 1000 / dt;
      this.frames++;
    };

    /**
     * Draws the stats to the current html element's paragraph child
     */
    Performance.prototype.render = function() {
      if (this.elapsedTime >= 200) {
        var adjustedFPS = (this.fps / this.frames).toFixed(2);
        if (isNaN(adjustedFPS) || !isFinite(adjustedFPS)) {
          adjustedFPS = 'Calculating';
        }

        this.$element.innerHTML = 'FPS: ' + adjustedFPS;

        this.elapsedTime = 0;
        this.fps = 0;
        this.frames = 0;
      }
    };

    return Performance;
});