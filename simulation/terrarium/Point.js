function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.add = function(v) {
	return new Point(v.x + this.x, v.y+this.y);
};

Point.prototype.isEqualTo = function(v) {
	return this.x == v.x && this.y == this.y;
};

module.exports = Point;




var thePlan =
  ["############################",
   "#                     ######",
   "#    ***                **##",
   "#   *##**         **  @  *##",
   "#    ***     @    ##**    *#",
   "#       @         ##***   *#",
   "#                 ##**    *#",
   "#   @       #*            *#",
   "#*          #**       @   *#",
   "#***        ##**    @    **#",
   "#*****     ###***       *###",
   "############################"];

// var terrarium = new Terrarium(thePlan);
// var terrarium = new LifeLikeTerrarium(thePlan);
// console.log(terrarium.toString());
// terrarium.step();
// setTimeout(terrarium.stop(), 1000);
// console.log(creatureTypes);
// terrarium.start();
console.log("start");
console.log("after settimeout");
// console.log(Object.prototype.toString.call("ss") == "[object String]");