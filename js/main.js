requirejs(['engine/game_controller', 'engine/renderer', 'engine/performance_monitor'], function(GameController, Renderer, PerformanceMonitor) {
    'use strict';

    var $canvas = document.getElementById('canvas');
    var $performance = document.getElementById('performance');
    var context = $canvas.getContext('2d');

    var renderer = new Renderer(context);
    var performance_monitor = new PerformanceMonitor($performance);

    var controller = new GameController(renderer, performance_monitor);
    controller.init();

    var scaleCanvas = function() {
        var $container = document.getElementsByClassName('container')[0];
        var border_width = parseInt(getComputedStyle($container)['border-width'], 10) * 2;

        $canvas.width = $container.offsetWidth - border_width;
        $canvas.height = $container.offsetHeight - border_width;

        // changing the canvas width or height re-initializes the canvas' state, including transforms and fill colors
        renderer.init();
    };

    scaleCanvas();

     window.addEventListener('resize', function(event) {
        scaleCanvas();
     }, false);
});