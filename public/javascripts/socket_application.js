var socket = io.connect('http://localhost:3000');

$(function(){
	$('input[socket_name]').change(function(){
		var elem = $(this);
 		var name = elem.attr('socket_name')
 			, value = elem.val();
		socket.emit(name, {name: name, val: value});
	}
});
