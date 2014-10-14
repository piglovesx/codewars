function parent() {
}

parent.prototype.sayHello = function(x) {
	console.log(x);
}


function child() {
	this.sayHello1 = function(x) {
		// parent.prototype.sayHello(x);
		// console.log(this.caller);
		// return "hello";
	}
}

child.prototype = new parent();
child.prototype.constructor = child;

child.prototype.sayHello = function(x) {
	parent.prototype.sayHello(x);
	console.log(x + ' zhulei');
}

// console.log(new child().sayHello("hello, world"));

var Animal = {
  name: 'noname',
  speak: function(food) {
    return 'I would like to eat '+this.name+'!';
  },
  sayHello: function() {

  }
};

Function.prototype.extend = function(parent) {
  var child = this;
  var childprototype = child.prototype;
  child.prototype = Array.prototype.concat.call(parent, childprototype);
  // console.log(arguments);
  // console.log(Array.prototype.slice.call(arguments,1));
  // console.log(new child(Array.prototype.slice.call(1,arguments)));
  // child.prototype = new child(Array.prototype.slice.call(arguments,1));
  console.log(child.prototype);
  child.prototype.constructor = child;
}

var Rabbit = function(name) {   
  if (name) this.name = name;  
  
  this.speak = function(food) {
  	return Animal.speak.call(this, food);
    // return 'Rabbits don\'t speak!';
  };
}

Rabbit.prototype.sayHi = function() {
  console.log("Rabbit say Hi!");
}

Rabbit.extend(Animal);
var rabbit1 = new Rabbit('Joe');
var rabbit2 = new Rabbit('Ken');
// rabbit1.sayHi();
console.log( rabbit1.speak('a carrot') );  //displays "Rabbits don't speak!"
console.log( rabbit2.speak('a pig') );  //also displays "Rabbits don't speak!"