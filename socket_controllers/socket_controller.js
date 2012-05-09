SocketController = function(socket){

 	index = function(data){
		console.log(data);
		socket.broadcast.emit("car_updated", data);
	};
	
	return {index: index};	
};

module.exports = SocketController;

