function Rabbit(aj) {
				this.aj = aj;
}

function makeRa(aj) {
return {aj:aj};
}

var aj = new Rabbit("hello");
var aj1 = new makeRa("hello");

console.log(Rabbit.prototype);
console.log(aj1.prototype);
console.log(aj.constructor);
console.log(aj1.constructor);
