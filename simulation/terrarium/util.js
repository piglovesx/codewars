function bind(func, object) {
  return function(){
    return func.apply(object, arguments);
  };
}

function forEach(array, action) {
				for(var i in array) {
								action(array[i]);
				}
}

function forEachIn(object, action) {
  for (var property in object) {
    if (object.hasOwnProperty(property))
      action(property, object[property]);
  }
}

function randomElement(array) {
  if (array.length == 0)
    throw new Error("The array is empty.");
  return array[Math.floor(Math.random() * array.length)];
}

function clone(object) {
  function OneShotConstructor(){}
  OneShotConstructor.prototype = object;
  return new OneShotConstructor();
}

exports.bind = bind;
exports.forEach = forEach;
exports.forEachIn = forEachIn;
exports.randomElement = randomElement;
exports.clone = clone;