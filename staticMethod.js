function Robbot() {

}

Robbot.name1 = "Sky";
Robbot.sayHi = function hello() {
	return this.name1;
}

console.log(Robbot.name);
console.log(Robbot.sayHi());