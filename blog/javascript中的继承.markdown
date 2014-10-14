**javascript中的继承主要是通过原型链`prototype`来实现**

####    1.原型链继承
``` javascript
function SuperType(){
    this.supername = "father";
}

SuperType.prototype.sayHello = function(){
    console.log(this.supername);
}

function SubType(){
    this.subname = "son";
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

var sub = new SubType();
sub.sayHello();//father
```
使用原型链继承的主要问题就是共享，字类会共享父类所有的属性以及方法，而有时候我们不希望子类共享属性.示例代码如下:
``` javascript
var sub = new SubType();
var sub1 = new SubType();
sub1.supername = "sub1 change the father";
sub.sayHello();//sub1 change the father
```
可以通过下面的介绍的继承方法解决这个问题

####    2.组合继承
组合继承就是使用构造函数和原型链共同实现继承，通过调用超类的构造函数来实现实例属性的不共享，通过原型链实现共享超类的访求.
``` javascript
function SuperType(){
    this.supername = "father";
}

SuperType.prototype.sayHello = function(){
    console.log(this.supername);
}

function SubType(){
    SuperType.call(this)
    this.subname = "son";
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

var sub = new SubType();
sub.sayHello();//father
var sub1 = new SubType();
sub1.supername = "sub1 change the supername";
sub.sayHello();//father
sub1.sayHello();//sub1 change the supername
```
使用组合继承还有一个优势就是能向父类传参
``` javascript
function SuperType(name){
    this.supername = name;
}
function SubType(){
    SuperType.call(this, "jack")
    this.subname = "son";
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
```
####    3. 原型式继承
``` javascript
function object(o){
    function F() {}
    F.prototype = o;
    return new F();
}

var person = {
    name: "jack",
    friends: ['rose']
}

var anotherperson = object(person);
```
这种方式的基本思路是通过已有对象来创建一个实例