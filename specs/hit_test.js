define(['js/hit_test'], function(HitTest) {
    describe("Testing if a point is within a circle", function(){
        var center = {
            x: 0,
            y: 0
        };

        var point = {
            x: 5,
            y: 5
        };

        it("returns true if the point is within the circle's radius", function() {
            var sqrt = Math.sqrt(50) + 1;
            expect(HitTest.circle(center, point, sqrt)).toBeTruthy();
        });

        it("returns true if the point touches the circle's radius", function() {
            var sqrt = Math.sqrt(50);
            expect(HitTest.circle(center, point, sqrt)).toBeTruthy();
        });

        it("returns false if the point is outside the circle's radius", function() {
            var sqrt = Math.sqrt(50) - 1;
            expect(HitTest.circle(center, point, sqrt)).toBeFalsy();
        });
    });
});