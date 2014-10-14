function sortList(sortBy, list) {
	return list.sort(function(a, b) {
		if (a[sortBy] > b[sortBy])
			return -1;

		if (a[sortBy] < b[sortBy])
			return 1;

		return 0;
	});
}

//console.log(sortList('a', [
//  {a: 4, b: 12},
//  {a: 3, b: 2},
//  {a: 6, b: 40},
//  {a: 8, b: 3}
//]
//));

Calculator = {
	average: function() {
		//var sum = 0;
		Array.prototype.forEach.call(arguments, function(item) {
			//console.log(item);
		});
		return Array.prototype.reduce.call(arguments, function(sum, base) {
			return sum + base;
		}, 0) / arguments.length;
	}
};

console.log(Calculator.average(3, 4, 5));

var str = 'abcdef';
var consonantsOnlyStr = Array.filter(str, function(c) {
	!(/[aeiou]/i).test(c);
}).join(''); // 'bcdf'
//var vowelsPresent = Array.some(str, function (c) (/[aeiou]/i).test(c)); // true
//var allVowels = Array.every(str, function (c) (/[aeiou]/i).test(c)); // false
//var interpolatedZeros = Array.map(str, function (c) c+'0').join(''); // 'a0b0c0d0e0f0'
//var numerologicalValue = Array.reduce(str, function (c, c2) c+c2.toLowerCase().charCodeAt()-96, 0);