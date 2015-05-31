requirejs(['game_controller', 'renderer', 'performance_monitor'], function(GameController, Renderer, PerformanceMonitor) {
    var $canvas = document.getElementById('canvas');
    var $performance = document.getElementById('performance');

    var renderer = new Renderer($canvas.getContext('2d'));
    var performance_monitor = new PerformanceMonitor($performance);

    var controller = new GameController($canvas, renderer, performance_monitor);
    controller.init();

    $canvas.addEventListener('click', function(event) {
        controller.explosion({
            x: event.layerX,
            y: event.layerY
        })
    }, false);
});