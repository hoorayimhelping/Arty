define(['js/engine/input'], function(Input) {
    describe("The Input state handler", function() {
        var input = null;

        describe("initializing the input handler", function() {
            beforeEach(function() {
                input = new Input();
            });

            // curious to see how this pattern holds up
            it("sets up 3 default keys", function() {
                expect(Object.keys(input.active_keys).length).toEqual(0);

                input.init();

                expect(Object.keys(input.active_keys).length).toEqual(3);
            });

            it("sets up the defaults to be false", function() {
                input.init();
                expect(input.active_keys.space).toBeFalsy();
                expect(input.active_keys.up).toBeFalsy();
                expect(input.active_keys.down).toBeFalsy();
            });
        })
    });
});