module.exports = function(socket){
	SocketController = require('./socket_controller')(socket);
  socket.on('oil_pressure', function(data){
		console.log("oil_pressure was changed!");		
		SocketController.index
	});
  socket.on('tire_pressure', function(data){SocketController.index});
  socket.on('washer_fluid_level', function(data){SocketController.index});
};
