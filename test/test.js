var request = require('request'),
		assert = require('assert'),
		base_url = "http://localhost:3000/";

describe("Job portal Index",function(){

	describe("GET /", function(){

		it("returns status code 200", function(){
			request.get(base_url, function(err, response,body){
				assert.equal(200,response.statusCode);
				done();
			});
		});
	});

});
