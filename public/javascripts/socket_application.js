var quick_configs
	, socket = io.connect('http://localhost:3000');
	
// var QuickConfig = {
// 	low: {
// 		oil_pressure: 10, 
// 		tire_1_pressure: 20,
// 		tire_2_pressure: 20,
// 		tire_3_pressure: 20,
// 		tire_4_pressure: 20,
// 		washer_fluid_level: 5
// 	}, 
// 	
// 	medium: {
// 		oil_pressure: 40, 
// 		tire_pressure: 40,
// 		washer_fluid_level: 30
// 	}, 
// 	
// 	high: {
// 		oil_pressure: 90, 
// 		tire_pressure: 70,
// 		washer_fluid_level: 80
// 	}
// };

$(function(){	

	var QuickConfigs;

	var setQuickConfigs = function(data){
		console.log("setQuickConfigs", data);
		QuickConfigs = data;
		// var config_names = [];
		// $.each(QuickConfigs, function(index, config){
		// 	console.log('config data', config);
		// 	config_names.push(config['config_name']);
		// });	
		// console.log("config_names", config_names);
		
		var quick_config_select = $('select#quick_config_select');
		$.each(QuickConfigs, function(index, config_data){
			$.each(config_data, function(k,v){
				quick_config_select.append('<option value="'+ k +'">' + k + '</option>');				
			});
		});
	};

	var car_stat_inputs = $('div.car_stats input, div.car_stats select');
	
	var getCarStats = function(){
		var form_values = [];
		car_stat_inputs.each(function(){
			var form_elem = $(this);
			var data_pair = {
					input_name: form_elem.attr('name')
				,	input_value: form_elem.val()
			}
			form_values.push(data_pair); 
		});
		return form_values;
	};
	
	var findQuickConfigValuesForName = function(name){
		var found_config;
		$.each(QuickConfigs, function(index, config){
			if(config[name]){found_config = config[name]; }
		});
		return found_config;
	}
		
	car_stat_inputs.change(function(){
		var elem = $(this);
 		var event_name = elem.attr('name')
			, car_stats = getCarStats();
		console.log("changed: event_name", event_name, "car_stats", car_stats);
		socket.emit('car_stat_update', {event_name: event_name, data: car_stats});
	});
	
	

	$('select#quick_config_select').change(function(){
		var elem = $(this);
		console.log('QuickConfigs', QuickConfigs);
		var config_values = findQuickConfigValuesForName(elem.val());
		console.log("config selected", elem.val(), "config values", config_values);
		$.each(config_values, function(k,v){
			var form_element = $('input[name="' + k + '"]')
			form_element.val(v);
			form_element.trigger('change');
		});
	});	
	
	socket.on("quick_configs", setQuickConfigs)
	socket.emit("request_configs");
	
});

