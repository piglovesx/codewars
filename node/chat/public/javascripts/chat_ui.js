function divEscapedContentElement(message) {
	return $('<div></div>').text(message);//text?
}

function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;
	if (message.charAt(0) == '/') { 
		systemMessage = chatApp.processCommand(message);
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		chatApp.sendMessage($('#room').text(), message); 
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}
	$('#send-message').val('');
}

var socket = io.connect();
$(document).ready(function() {
	var chatApp = new Chat(socket);
	//display the result of a name change result
	socket.on('nameResult', function(result) { 
		var message;
		if (result.success) {
			message = 'You are now known as ' + result.name + '.';
		} else {
			message = result.message;
		}
		$('#messages').append(divSystemContentElement(message));
	});
	//display the result of a room change
	socket.on('joinResult', function(result) { 
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'));
	});
	//display received messages
	socket.on('message', function (message) { 
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});
	//display list of rooms avaliable
	socket.on('rooms', function(rooms) { 
		$('#room-list').empty();
		for(var room in rooms) {
			room = room.substring(1, room.length);
			if (room != '') {
				$('#room-list').append(divEscapedContentElement(room));
			}
		}
		//allow the click of a room name to change to that room
		$('#room-list div').click(function() { 
			chatApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});
	//request list of rooms avaliable intermittanly
	setInterval(function() { 
		socket.emit('rooms');
	}, 1000);
	$('#send-message').focus();
	//allow clicking the send button to send a chat message
	$('#send-form').submit(function() {
		processUserInput(chatApp, socket);
		return false;
	});
});