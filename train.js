function flatten(array) {

	/*if (array.length == 0 || !Array.isArray(array[0])) {
		return array;
	}

	var arr_1 = [];
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			arr_1.push(array[i][j]);
		}
	}

	return arr_1;*/

	return Array.prototype.concat.apply([],array);

}

console.log(flatten([1, 2, 3]));
console.log(flatten([[1,2,3],["a","b","c"],[1,2,3]]));
console.log(flatten([[[1, 2, 3]]]));
console.log(Array.prototype.concat.apply([], [[1,2,3],["a","b","c"],[1,2,3]]));
