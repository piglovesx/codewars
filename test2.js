//var interval = 1000; // 1
//(function  schedule()  {    //
// setTimeout(function  do_it()  {
//								 console.log('async  is done!');
//								 schedule();
//				 }, interval*5);
// }());      //µÚ10ÐÐ


/*var interval = 1000;
setInterval(function() {
	(function my_async_function() {
		setTimeout(function() {
			console.log("1");
		}, interval*3);
	})();
}, 1000);*/

var interval = 1000;
console.time("bb");
(function  schedule()  {
  setTimeout(function  do_it()  {
      setTimeout(function() {
          console.log("async content");
          schedule();
          console.timeEnd("bb");
      }, interval*6);
  }, interval*5);
}());