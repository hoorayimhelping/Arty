define([], function() {
    var HitTest = {
        circle: function(center, point, radius) {
            var distance = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));

            var distance_fixed = parseFloat(distance.toFixed(5));
            var radius_fixed = parseFloat(radius.toFixed(5));

            return radius_fixed >= distance_fixed;
        }
    };

    return HitTest;
});