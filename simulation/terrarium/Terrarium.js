var Point = require("./Point");
var Dictionary = require("./Dictionary");
var Grid = require("./Grid");
var util = require("./util");
var Bug = require("./Bug");

var BouncingBug = Bug.BouncingBug;
var DrunkBug = Bug.DrunkBug;
var StupidBug = Bug.StupidBug;
var Lichen = Bug.Lichen;
var LichenEater = Bug.LichenEater;
var CleverLichenEater = Bug.CleverLichenEater;

var forEach = util.forEach;
var bind = util.bind;

var wall = {};

var thePlan =
  ["############################",
   "#      #    #      o      ##",
   "#                          #",
   "#          #####           #",
   "##         #   #    ##     #",
   "###           ##     #     #",
   "#           ###      #     #",
   "#   ####                   #",
   "#   ##       o             #",
   "# o  #         o       ### #",
   "#    #                     #",
   "############################"];
wall.character = "#";

var directions = new Dictionary(
  {"n":  new Point( 0, -1),
   "ne": new Point( 1, -1),
   "e":  new Point( 1,  0),
   "se": new Point( 1,  1),
   "s":  new Point( 0,  1),
   "sw": new Point(-1,  1),
   "w":  new Point(-1,  0),
   "nw": new Point(-1, -1)});

var creatureTypes = new Dictionary();
creatureTypes.register = function(constructor) {
  this.store(constructor.prototype.character, constructor);
};

creatureTypes.register(StupidBug);
creatureTypes.register(BouncingBug);
creatureTypes.register(DrunkBug);
creatureTypes.register(Lichen);
creatureTypes.register(LichenEater);
creatureTypes.register(CleverLichenEater);

function Terrarium(plan) {
  var grid = new Grid(plan[0].length, plan.length);
  for (var y = 0; y < plan.length; y++) {
    var line = plan[y];
    for (var x = 0; x < line.length; x++) {
      grid.setValueAt(new Point(x, y),
                      elementFromCharacter(line.charAt(x)));
    }
  }
  this.grid = grid;
}

Terrarium.prototype.toString = function() {
  var characters = [];
  var endOfLine = this.grid.width - 1;
  this.grid.each(function(point, value) {
    characters.push(characterFromElement(value));
    if (point.x == endOfLine)
      characters.push("\n");
  });
  return characters.join("");
};

Terrarium.prototype.listActingCreatures = function() {
  var found = [];
  this.grid.each(function(point, value) {
    if (value != undefined && value.act)
      found.push({object: value, point: point});
  });
  return found;
};

Terrarium.prototype.listSurroundings = function(center) {
  var result = {};
  var grid = this.grid;
  directions.each(function(name, direction) {
    var place = center.add(direction);
    if (grid.isInside(place))
      result[name] = characterFromElement(grid.valueAt(place));
    else
      result[name] = "#";
  });
  return result;
};

Terrarium.prototype.processCreature = function(creature) {
  var surroundings = this.listSurroundings(creature.point);
  var action = creature.object.act(surroundings);
  if (action.type == "move" && directions.contains(action.direction)) {
    var to = creature.point.add(directions.lookup(action.direction));
    if (this.grid.isInside(to) && this.grid.valueAt(to) == undefined)
      this.grid.moveValue(creature.point, to);
  }
  else {
    throw new Error("Unsupported action: " + action.type);
  }
};

Terrarium.prototype.step = function() {
  forEach(this.listActingCreatures(),
          bind(this.processCreature, this));
  console.log(this.toString());
};

Terrarium.prototype.start = function() {
  if (!this.running) {
    this.running = setInterval(bind(this.step, this), 500);
  }
};

Terrarium.prototype.stop = function() {
  if (this.running) {
    clearInterval(this.running);
    this.running = null;
  }
  console.log("stop");
};

function elementFromCharacter(character) {
  if (character == " ")
    return undefined;
  else if (character == "#")
    return wall;
  else if (creatureTypes.contains(character))
    return new (creatureTypes.lookup(character))();
  else
    throw new Error("Unknown character: " + character);
}

function characterFromElement(element) {
  if (element == undefined)
    return " ";
  else
    return element.character;
}

var terrarium = new Terrarium(thePlan);
terrarium.start();

exports.Terrarium = Terrarium;
exports.elementFromCharacter = elementFromCharacter;
exports.characterFromElement = characterFromElement;
exports.directions = directions;