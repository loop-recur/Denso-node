var socket = io.connect('http://localhost:3000');

$(function(){	
	$('input[socket_name]').change(function(){
		var elem = $(this);
 		var socket_name = elem.attr('socket_name')
 			, value = elem.val();
		console.log("socket", socket, "elem", elem, "socket_name", socket_name, "value", value);
		socket.emit(name, {socket_name: name, value: value});
	});
	
});
