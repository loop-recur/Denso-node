SocketController = (function(socket){

 	index = function(data){
	  socket.emit('', {socket_name: "oil_pressure"});
	};
	
	return {index: index};	
});

module.exports = SocketController;

