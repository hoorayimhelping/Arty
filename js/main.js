requirejs(['game_controller', 'renderer'], function(GameController, Renderer) {
	var canvas = document.getElementById('canvas');
	var renderer = new Renderer(canvas.getContext('2d'));

	renderer.init();

    var controller = new GameController(canvas, renderer);
    controller.init();
});