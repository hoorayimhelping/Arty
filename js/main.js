requirejs([
    'game/controller',
    'engine/renderer',
    'engine/text_renderer',
    'engine/input',
    'engine/performance_monitor',
    'cannon',
    'projectile'
    ], function(GameController, Renderer, TextRenderer, Input, PerformanceMonitor, Cannon, Projectile) {
    'use strict';

    window.canvasWidth = function() {
        return $canvas.clientWidth;
    };

    window.canvasHeight = function() {
        return $canvas.clientHeight;
    };

    var $canvas = document.getElementById('canvas');
    var $performance = document.getElementById('performance');
    var context = $canvas.getContext('2d');

    var renderer = new Renderer(context);
    var text_renderer = new TextRenderer(context);
    var input = new Input($canvas);
    var performance_monitor = new PerformanceMonitor($performance);

    var projectile = new Projectile();
    projectile.init();

    var cannon = new Cannon(projectile);

    var controller = new GameController(renderer, text_renderer, input, performance_monitor, cannon);
    controller.init();

    var initCannons = function() {
        cannon.cannon.position.x = 0;
        cannon.cannon.position.y = canvasHeight();
    };

    var scaleCanvas = function() {
        var $container = document.getElementsByClassName('container')[0];
        var border_width = parseInt(getComputedStyle($container)['border-left-width'], 10) + parseInt(getComputedStyle($container)['border-right-width'], 10);

        $canvas.width = $container.offsetWidth - border_width;
        $canvas.height = $container.offsetHeight - border_width;

        // changing the canvas width or height re-initializes the canvas' state, including transforms and fill colors
        renderer.init();
        text_renderer.init();
        initCannons();
    };

    scaleCanvas();

    var createExplosion = function(event) {
        event.preventDefault();

        controller.explosion({
            x: event.layerX,
            y: event.layerY
        });
    };

     window.addEventListener('resize', function(event) {
        scaleCanvas();
     }, false);
});