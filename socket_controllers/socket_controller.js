SocketController = function(socket){

 	index = function(data){
		console.log(data);
	};
	
	return {index: index};	
};

module.exports = SocketController;

