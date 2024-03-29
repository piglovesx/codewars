var util = require("./util");
var forEachIn = util.forEachIn;
function Dictionary(startValues) {
  this.values = startValues || {};
}

Dictionary.prototype.store = function(name, value) {
  this.values[name] = value;
};

Dictionary.prototype.lookup = function(name) {
  return this.values[name];
};

Dictionary.prototype.contains = function(name) {
  return Object.prototype.hasOwnProperty.call(this.values, name) &&
    Object.prototype.propertyIsEnumerable.call(this.values, name);
};

Dictionary.prototype.each = function(action) {
  forEachIn(this.values, action);
};

Dictionary.prototype.names = function() {
  var names = [];
  this.each(function(name, value) {names.push(name);});
  return names;
};

module.exports = Dictionary