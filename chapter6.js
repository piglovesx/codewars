//apply方法可以接受Array Like Object
//----------------------------------------
function fun(arg, arg1) {
	console.log(arg);

	console.log(arg1);
}


function fun1(arg, arg1) {
	fun.apply(null, arguments);
}

//fun1('hello', 'world');

//functional program
//---------------------------------------


function countZeros1(arr) {
				return arr.reduce(function(sum, item) {
												return sum + (item === 0 ? 1 :0);
												}, 0);
}

//console.log(countZeros1([0,1,0]));

function countZeros(array) {

				return count(equals(0), array);

}

function equals(x) {
				return function(element) {return x === element;};
}

function count(test, array) {
				return reduce(function counter (total, element) {
								return total + 	(test(element) ? 1 : 0);
				}, 0, array);
}

function reduce(combine, base, array) {
				forEach(array, function(element) {
								base = combine(base, element);
				});

				return base;
}

function forEach(array, action) {
				for(var i in array) {
								action(array[i]);
				}
}

console.log(countZeros([0,1,0]));

//-------------------------------------------------------

//processParagraph
//---------------------------------------------------------

function map(func, array) {
				var result = [];
				forEach(array, function(element) {
												result.push(func(element));
												});
				return result;
}

//var paragraphs = recluseFile().split("\n\n");

function processParagraph(paragraph) {
				var header = 0;

				while (paragraph.charAt(0) == '%') {
								paragraph = paragraph.slice(1);
								header++;
				}

				return {type: (header === 0 ? 'p' : 'h' + header), content: paragraph};
}

function tag(name, content, attributes) {
				return {name: name, attributes: attributes, content: content};
}

function link(target, text) {
				return tag("a", [text], { href: target});
}

function htmlDoc(title, bodyContent) {
				return tag("html", [tag("head", [tag("title", [title])]), tag("body", bodyContent)]);
}

function image(loc) {
				return tag("img", [], {src: loc});
}

function escapeHTML(text) {
  var replacements = [[/&/g, "&amp;"], [/"/g, "&quot;"],
                      [/</g, "&lt;"], [/>/g, "&gt;"]];
  forEach(replacements, function(replace) {
    text = text.replace(replace[0], replace[1]);
  });
  return text;
}

function renderHTML(element) {

				var pieces = [];

				function renderAttributes(attributes) {

								var result = [];
								if (attributes) 
								{
												for (var name in attributes) {
																result.push(" " + name + "=\"" + escapeHTML(attributes[name]) + "\"");
												}
								}
								return result.join("");
				}

				function render(element) {
								if (typeof element == "string") {
												pieces.push(escapeHTML(element));
								}

								else if(!element.content || element.content.length === 0) {
												pieces.push("<" + element.name + renderAttributes(element.attributes) + "/>");
								}
								else {
												pieces.push("<" + element.name + renderAttributes(element.attributes) + ">");
												forEach(element.content, render);
												pieces.push("</" + element.name + ">");
								}
				}

				render(element);
				return pieces.join("");
}


console.log(renderHTML(link("http://www.nedroid.com", "Drawings!")));
var body = [tag("h1", ["The Test"]),
            tag("p", ["Here is a paragraph, and an image..."]),
            image("img/sheep.png"), "Hello World"];
var doc = htmlDoc("The Test", body);
console.log(renderHTML(doc));

//------------------------------------------------------------------------------------------------------

function asArray(quasiArray, start) {
				var result = [];
				for (var i = (start || 0); i < quasiArray.length; i++) {
								result.push(quasiArray[i]);
				}
				return result;
}

function partial(func) {
				var fixedArgs = asArray(arguments, 1);
				return function() {
								return func.apply(null, fixedArgs.concat(asArray(arguments)));
				};
}

function square(x) {
				return x*x;
}

console.log(map(partial(map, square),[[1,2],[2,3]]));
var s = [[1,2]].map(function(item) {
								return item.map(square);
});

console.log(s);
