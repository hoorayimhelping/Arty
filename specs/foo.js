define(['js/foo'], function(Foo) {
	describe("a test spec", function() {
		it("exists", function() {
			expect(Foo).toBeDefined();
		});
	});
});