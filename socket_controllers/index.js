module.exports = function(socket){
	SocketController = require('./socket_controller')(socket);
  socket.on('oil_pressure', function(data){SocketController.index});
};
