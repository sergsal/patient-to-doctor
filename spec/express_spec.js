'use strict';

var request = require('request');

var base_url = "http://localhost:3000";

describe("Express GET requests", function() {
	it("should return all Physicians", function(done) {
		request.get(base_url + "/physicians", function(error, response, body) {
			expect(error).toBeNull();
			expect(response.statusCode).toBe(200);
			expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
			done();
		});	
	});

	// it("should return a set Physicians according to specialty and city", function(done) {
	// 	request.get(
	// 		base_url + "/search/physicians/?specialty=cardiology&city=orlando",
	// 		function(error, response, body) {
	// 			expect(response.error).not.toBeNull();
	// 			expect(response.statusCode).toBe(200);
	// 			expect(response.headers['content-type']).toBe('application/json; charset=utf-8');

	// 			//check each Physician Json
	// 			JSON.parse(body).physicians.forEach(function(physician) {
	// 				expect(physician.specialty.toLowerCase()).toBe("cardiology");
	// 				expect(physician.city.toLowerCase()).toBe("orlando");
	// 			});
	// 		}
	// 	);
	// });
});