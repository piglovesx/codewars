function test(array) {
				return ('isArray' in Array) ? Array.isArray(array) : toString.call(array) === '[object Array]';
}

//console.log(Object.prototype.toString);
//console.log(toString.call([]));
//console.log(test([1,2,]));
//console.log(test(1));

function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0)
    throw RangeError('Cannot create product "' + name + '" with a negative price');
  //return this;
}

//����call��ʵ�ּ̳�
//----------------------------------------------------------
var savedThis;
function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
	savedThis = this;
}
Food.prototype = new Product();

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}
Toy.prototype = new Product();

var cheese = new Food('feta', 5);
console.log(cheese.name);
console.log(savedThis === cheese);
//console.log(cheese.name);
var fun = new Toy('robot', 40);
//console.log(fun.name);
//
//-----------------------------------------------------------

//-----------------------------------------------------------
//����call������������
animals = [
  {species: 'Lion', name: 'King'},
  {species: 'Whale', name: 'Fail'}
];

for (var i = 0; i < animals.length; i++) {
  (function (i) { 
    this.print = function () { 
      //console.log('#' + i  + ' ' + this.species + ': ' + this.name); 
    };
    this.print();
  }).call(animals[i], i);
}

//------------------------------------------------------------


//����ð��ʵ�ּ̳�
//------------------------------------------------------------
function ClassA(sColor) {
				//console.log("start");
				//console.log(this);
				//console.log("end");
				//�����thisָ��ClassB
				this.color = sColor;
				this.sayColor = function () {
								//console.log(this.color);
				};
				//console.log(this);
}

function ClassB(sColor) {
	this.a = ClassA;
	//console.log("StartB");
	this.a(sColor);
	//console.log(this.a(sColor));
	//console.log(this);
	delete this.a;
}

new ClassB('red').sayColor();
//------------------------------------------------------------


//����ԭ��,prototype
//------------------------------------------------------------
var a = {a:1};
var b = Object.create(a);
//console.log(b.a);
//------------------------------------------------------------

//this, bindʹ��
//-----------------------------------------------------------
function callIt(func) {
console.log('start',func);
func();
}

var counter = {
count: 0,
inc: function() {
this.count++;
}
};

callIt(counter.inc.bind(counter));

