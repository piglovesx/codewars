var roads = {};

function makeRoad(from, to, length) {
  function addRoad(from, to) {
    if (!(from in roads))
      roads[from] = [];
    roads[from].push({to: to, distance: length});
  }
  addRoad(from, to);
  addRoad(to, from);
}

function makeRoads(from) {
				var args = Array.prototype.slice.call(arguments, 1);
				for (var i = 0; i < args.length; i=i+2) {
								makeRoad(from, args[i], args[i+1]);
				}
}

//Find Roads
function roadsFrom(place) {
				var found = roads[place];
				if (found === undefined)
								throw new Error("No place named '" + place + "' found.");
				else
								return found;
}

function member(array, value) {
				//var found = false;
				//var count = 0;
				//try{
				//				array.forEach(function(element) {
				//												count += 1;
				//												if (element === value) {
				//												found = true;
				//												throw 'Have Found';
				//												}
				//												}, this);
				//}
				//catch (exception) {
				//}
				//finally {
				//				return found;
				//}

				return array.some(function(element, index, arr) {
												return element === value;
												});
}

function flatten(arrays) {
				return Array.prototype.concat.apply([], arrays);
}

function possibleRoutes(from, to) {
				function findRoutes(route) {
								function notVisited(road) {
												return !member(route.places, road.to);
								}

								function continueRoute(road) {
												return findRoutes({
																places: route.places.concat(road.to),
																length: route.length + road.distance});
								}
								var end = route.places[route.places.length - 1];
								if (end == to) {
												return [route];
								} else {
												return flatten(roadsFrom(end).filter(function(element) {
																			return notVisited(element);
															 }).map(function(ele) {
																			return continueRoute(ele);
															 }));
								}
				}
				return findRoutes({places: [from], length: 0});
}



//console.log(flatten([[1,2],[3, 4]]));

//console.log(member([1,2,3], 2));

makeRoads("Point Kiukiu", "Hanaiapa", 19, "Mt Feani", 15, "Taaoa", 15);
makeRoads("Airport", "Hanaiapa", 6, "Mt Feani", 5, "Atuona", 4, "Mt Ootua", 11);
makeRoads("Mt Temetiu", "Mt Feani", 8, "Taaoa", 4);
makeRoads("Atuona", "Taaoa", 3, "Hanakee pearl lodge", 1);
makeRoads("Cemetery", "Hanakee pearl lodge", 6, "Mt Ootua", 5);
makeRoads("Hanapaoa", "Mt Ootua", 3);
makeRoads("Puamua", "Mt Ootua", 13, "Point Teohotepapapa", 14);

//console.log(possibleRoutes("Point Teohotepapapa", "Point Kiukiu").length);
//console.log(possibleRoutes("Hanapaoa", "Mt Ootua"));
console.log(possibleRoutes("Airport", "Point Teohotepapapa"));
console.log(roadsFrom("Airport"));
//console.log(roads["Airport"]);
//
//




