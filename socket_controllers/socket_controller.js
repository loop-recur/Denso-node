SocketController = function(socket){
	
	var _allConfigsAsJson = function(){
		var fs = require('fs')
			, configs = []
			, dir = __dirname + "/../car_stat_config_files";
		var filenames = fs.readdirSync(dir)
		for(var i=0, fname; fname=filenames[i]; i++){
			var config_name = fname.split('.')[0];
			var raw_data = fs.readFileSync(dir + '/' + fname, 'utf8');
			var json_data = {};
			json_data[config_name] = JSON.parse(raw_data);
			configs.push(json_data);
		}
		console.log('configs', configs);
		return configs;
	};

 	index = function(data){
		console.log(data);
		socket.broadcast.emit("car_stats_received", data);
	};
	
	getConfigs = function(){
		console.log("getConfigs is called!");
		socket.emit("quick_configs", _allConfigsAsJson());
	};
	
	return {index: index, getConfigs: getConfigs};	
};

module.exports = SocketController;

