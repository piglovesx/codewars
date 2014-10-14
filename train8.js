
//likes([]); // must return "no one likes this"
//likes(['Peter']); // must return "Peter likes this"
//likes(['Jacob', 'Alex']); // must return "Jacob and Alex like this"
//likes(['Max', 'John', 'Mark']); // must return "Max, John and Mark like this"
//likes(['Alex', 'Jacob', 'Mark', 'Max']); // must return "Alex, Jacob and 2 others like this"

function likes(arr) {
				var len = arr.length;
				var msg;
				msg = generateV(4, len) + (len <= 1 ? " likes this" : " like this");
				return msg;

				function generateV(index, leng) {
								if (index <= leng ) {
												if (index == 4) {
																return generateV(2, leng) + " and " + (2 + leng - index) + " others";
												}
												if (index == 3){
																return generateV(2, leng) + " and " + arr[index- 1];
												}
												if (index == 2) {
																if (leng == 2)
																				return arr[0] + " and " + arr[1];
																return arr[0] + ", " + arr[1];
												}
												if (index == 1) {
																return arr[0];

												}
												if (index === 0) {
																return "no one";
												}
								}
								if (index > leng) {
												index = leng;
												return generateV(index, leng);
								}
				}
}

console.log(likes(['Alex', 'Jacob', 'Mark', 'Max', 'jack']));
console.log(likes(['Alex', 'Jacob', 'Mark']));
console.log(likes(['Alex', 'Jacob']));
console.log(likes(['Alex']));
console.log(likes([]));
