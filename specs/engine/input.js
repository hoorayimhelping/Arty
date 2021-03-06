Function.prototype.bind = Function.prototype.bind || function (context) {
    var fn = this;
    return function () {
        return fn.apply(context, arguments);
    };
};

define(['js/engine/input'], function(Input) {
    describe("The Input state handler", function() {
        var input = null;

        describe("initializing the input handler", function() {
            beforeEach(function() {
                input = new Input();
            });

            // curious to see how this pattern holds up
            it("sets up 5 default keys", function() {
                expect(Object.keys(input.active_keys).length).toEqual(0);

                input.init();

                expect(Object.keys(input.active_keys).length).toEqual(5);
            });

            it("sets up the defaults to be false", function() {
                input.init();
                expect(input.active_keys.space).toBeFalsy();
                expect(input.active_keys.up).toBeFalsy();
                expect(input.active_keys.down).toBeFalsy();
            });
        });

        describe("handling keypress and keyup", function() {
            beforeEach(function() {
                input = new Input();
            });

            it("sets space to being pressed when the key is pressed", function() {
                var event = { which: 32 };

                input.handleKeypress(event);
                expect(input.active_keys).toBeTruthy();
            });

            it("sets space to being not pressed after the key is released", function() {
                var event = { which: 32 };

                input.active_keys.space = true;

                input.handleKeyup(event);
                expect(input.active_keys.space).toBeFalsy();
            });
        });

        describe("querying the state of pressed keys", function() {
            beforeEach(function() {
                input = new Input();
                input.active_keys.up = true;
            });

            it("returns false if the key doesn't exist", function() {
                expect(input.isPressed('bughlarg')).toBeFalsy();
            });

            it("returns false if the key isn't being pressed", function() {
                expect(input.isPressed('down')).toBeFalsy();
            });

            it("returns true if the key is being pressed", function() {
                expect(input.isPressed('up')).toBeTruthy();
            });
        });
    });
});