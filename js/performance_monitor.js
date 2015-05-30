define([], function() {
    /**
     * Instantiates Performance Stats. Creates a child p element of $element
     * @param HTMLElement $element: The HTML Element to draw the stats into
     */
    var Performance = function($element) {
        this.$element = $element;

        var $fpsElement = document.createElement('p');
        this.$element.appendChild($fpsElement);
    };

    Performance.prototype.init = function() {
      this.fps = 0;
      this.elapsedTime = 0;
      this.frames = 0;

      this.draw();
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

      if (this.elapsedTime >= 200) {
        this.draw();

        this.elapsedTime = 0;
        this.fps = 0;
        this.frames = 0;
      }
    };

    /**
     * Draws the stats to the current html element's paragraph child
     */
    Performance.prototype.draw = function() {
      var adjustedFPS = (this.fps / this.frames).toFixed(2);
      if (isNaN(adjustedFPS) || !isFinite(adjustedFPS)) {
        adjustedFPS = 'Calculating';
      }

      this.$element.children[0].innerHTML = 'FPS: ' + adjustedFPS;
    };

    return Performance;
})