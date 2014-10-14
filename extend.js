function object(o){
	o.enemy=["sherlock"];
    function F() {}
    F.prototype = o;
    return new F();
}

var person = {
    name: "jack",
    friends: ['rose']
}

var anotherperson = object(person);
var yetperson = object(person);

person.friends.push("louse");
anotherperson.friends.push("kobe");
yetperson.friends.push("jams");
console.log(anotherperson.friends);
console.log(yetperson.friends);
console.log(person.enemy);