module.exports = function(socket){
	SocketController = require('./socket_controller')(socket);
  socket.on('oil_pressure', SocketController.index);
  socket.on('tire_pressure', SocketController.index);
  socket.on('washer_fluid_level', SocketController.index);
};
