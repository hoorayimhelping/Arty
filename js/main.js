requirejs([
    'engine/game_controller',
    'engine/renderer',
    'engine/input',
    'engine/performance_monitor',
    'cannon',
    'projectile'
    ], function(GameController, Renderer, Input, PerformanceMonitor, Cannon, Projectile) {
    'use strict';

    Math.toRadians = function(angle) {
        return (Math.PI / 180) * angle;
    };

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
    var input = new Input($canvas);
    var performance_monitor = new PerformanceMonitor($performance);

    var projectile = new Projectile();
    projectile.init();

    var cannon = new Cannon(projectile);

    var controller = new GameController(renderer, input, performance_monitor, cannon);
    controller.init();

    var initCannons = function() {
        cannon.cannon.x = 0;
        cannon.cannon.y = canvasHeight();
    };

    var scaleCanvas = function() {
        var $container = document.getElementsByClassName('container')[0];
        var border_width = parseInt(getComputedStyle($container)['border-left-width'], 10) + parseInt(getComputedStyle($container)['border-right-width'], 10);

        $canvas.width = $container.offsetWidth - border_width;
        $canvas.height = $container.offsetHeight - border_width;

        // changing the canvas width or height re-initializes the canvas' state, including transforms and fill colors
        renderer.init();
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