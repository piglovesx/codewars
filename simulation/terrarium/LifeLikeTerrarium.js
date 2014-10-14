var terrarium = require("./Terrarium");
var util = require("./util");
var clone = util.clone;
var Terrarium = terrarium.Terrarium;
var elementFromCharacter = terrarium.elementFromCharacter;
var characterFromElement = terrarium.characterFromElement;
var directions = terrarium.directions;
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
function LifeLikeTerrarium(plan) {
  Terrarium.call(this, plan);
}
LifeLikeTerrarium.prototype = clone(Terrarium.prototype);
LifeLikeTerrarium.prototype.constructor = LifeLikeTerrarium;

LifeLikeTerrarium.prototype.processCreature = function(creature) {
  if (creature.object.energy <= 0) return;
  var surroundings = this.listSurroundings(creature.point);
  var action = creature.object.act(surroundings);

  var target = undefined;
  var valueAtTarget = undefined;
  if (action.direction && directions.contains(action.direction)) {
    var direction = directions.lookup(action.direction);
    var maybe = creature.point.add(direction);
    if (this.grid.isInside(maybe)) {
      target = maybe;
      valueAtTarget = this.grid.valueAt(target);
    }
  }

  if (action.type == "move") {
    if (target && !valueAtTarget) {
      this.grid.moveValue(creature.point, target);
      creature.point = target;
      creature.object.energy -= 1;
    }
  }
  else if (action.type == "eat") {
    if (valueAtTarget && valueAtTarget.energy) {
      this.grid.setValueAt(target, undefined);
      creature.object.energy += valueAtTarget.energy;
      valueAtTarget.energy = 0;
    }
  }
  else if (action.type == "photosynthese") {
    creature.object.energy += 1;
  }
  else if (action.type == "reproduce") {
    if (target && !valueAtTarget) {
      var species = characterFromElement(creature.object);
      var baby = elementFromCharacter(species);
      creature.object.energy -= baby.energy * 2;
      if (creature.object.energy > 0)
        this.grid.setValueAt(target, baby);
    }
  }
  else if (action.type == "wait") {
    creature.object.energy -= 0.2;
  }
  else {
    throw new Error("Unsupported action: " + action.type);
  }

  if (creature.object.energy <= 0)
    this.grid.setValueAt(creature.point, undefined);
};

var terrarium = new LifeLikeTerrarium(thePlan);
terrarium.start();