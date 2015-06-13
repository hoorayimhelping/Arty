define(['js/engine/renderer'], function(Renderer) {
    var renderer;

    describe("the 2d rendering context", function(){
        describe("setting options", function() {
            beforeEach(function() {
                renderer = new Renderer({});
                renderer.init();
            });

            it("has default values", function() {
                expect(renderer.context.lineWidth).toBe(5);
                expect(renderer.context.fillStyle).toBe('#FFF');
                expect(renderer.context.strokeStyle).toBe('#000');
            });

            it("handles lineWidth", function() {
                renderer.options({ lineWidth: 3 });
                expect(renderer.context.lineWidth).toBe(3);
            });

            it("handles strokeStyle", function() {
                renderer.options({ strokeStyle: '#F30' });
                expect(renderer.context.strokeStyle).toBe('#F30');
            });
        });
    });
});