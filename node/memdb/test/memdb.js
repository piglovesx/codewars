var memdb = require("..");
var assert = require('assert');

describe('memdb', function() {
	beforeEach(function() {
		memdb.clear();
	});
	describe('.save(doc)', function(xx) {
		it('should save the document', function(){
			var pet = { name: 'Tobi'};
			memdb.save(pet, function() {
				var ret = memdb.first({ name: 'Tobi'});
				assert(ret == pet);
				xx();
			});
		});
	});

	describe('.first(obj)', function() {
		it('should return the first matching doc', function() {
			var tobi = { name : 'tobi'};
			var loki = {name: 'loki'};

			memdb.save(tobi);
			memdb.save(loki);

			var ret = memdb.first({name: 'tobi'});
			assert(ret == tobi);
			var ret = memdb.first({name: 'loki'});
			assert(ret == loki);
		});

		it('should return null when no doc matches', function() {
			var ret = memdb.first({name: 'Manny'});
			assert(ret == null);
		});
	});
});