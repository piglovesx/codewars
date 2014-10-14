//multi-line  text javascript 1.6
//shuffle the Array
var list = [1,2,3,4, 7, 8, 9];
list = list.sort(function(a, b) {
								//return b - a;
								return Math.random() - 0.5;
								});
// console.log(list);

//return multible values, only works in ES6, moz 
function f() {
	return [1, 2];
}
// var [a, b] = f();
// console.log(a + " " + b);

/*var a = 1;
var b = 2;
[a,b] = [b,a];
console.log(a);*/

function Match(v) {
	console.log(arguments);
	console.log(v);
	return Array.prototype.indexOf(arguments,v);
}
console.log(Match('aa', '0', 'b', 123, 'aa', 8.999 ));
