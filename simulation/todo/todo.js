$(function() {
	var obj = [{text: 'a', done: false}, {text: 'b', done: true}];
	var ulList = $("#toDoList");
	var inputV = $("#addValue");
	var remain = $("#remaining");
	var all = $("#all");
	var add = $("#add");
	var liList = $("input[type=checkbox]");
	var archive = $("#archive");

	function manipulate() {
		this.addTodo = function() {
			obj.push({text: inputV.val(), done: false});
			ulList.append("<li><input type='checkbox'><span class='done-false'>"+inputV.val()+"<span></li>")
			inputV.val("");
			this.bindClick($("input[type=checkbox]").last());
		};
		this.remaining = function() {
			var count = 0;
			obj.forEach(function(item) {
				count += item.done ? 0 : 1;
			});
			remain.html(count);
			all.html(obj.length);
			return count;
		};
		this.appendLi = function() {
			ulList.empty();
			this.remaining();
			obj.forEach(function(item) {
				var che = item.done ? "checked" : "";
				ulList.append("<li><input type='checkbox' "+che+" ><span class='done-"+item.done+"'>"+item.text+"<span></li>")
			});
			this.bindClick();
		};
		this.choose = function(item, index) {
			console.log("start");
			obj[index].done = true;
			item.siblings().attr("class", "done-true")
			this.remaining();
		};
		this.bindClick = function(objLi) {
			objLi = objLi ? objLi : $("input[type=checkbox]");
			objLi.change(function(eventObj) {
				var index = $("input[type=checkbox]").index($(this));
				obj[index].done = obj[index].done ? false : true;
				$(this).siblings().attr("class", "done-" + obj[index].done);
				manipulateObj.remaining();
			});
		};
		this.deleteA = function() {
			obj = obj.filter(function(item) {
				return !item.done;
			});
		}; 
	};

	var manipulateObj = new manipulate();
	add.click(function(event) {
		manipulateObj.addTodo();
		manipulateObj.remaining();
	});

	archive.click(function(eventObj) {
		manipulateObj.deleteA();
		manipulateObj.appendLi()
		manipulateObj.remaining();
	});

	manipulateObj.appendLi();
});