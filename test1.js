/**
 * 获取一级对象的特定值
 */
function getProperty(value, prop) {

				var arr = [], arrjson = {}, returnarr = [], v1;
				arr = value["record"];

				for (var v in arr) {
								v1 = arr[v];
								arrjson[v1[prop]] = v1[prop];
				}

				for (var v in arrjson) {
								returnarr.push(v);
				}

				return returnarr;

}

var json = {record: [{a: 'a', b: 'b'}, {a: 'c', b: 'd'}]};


console.log(getProperty(json, 'a'));

var a = [1,2,3]
console.log(a.splice(1,1));
console.log(a);
