var socket = io.connect('http://localhost:3000');

var QuickConfig = {
	low: {
		oil_pressure: 10, 
		tire_pressure: 20,
		washer_fluid_level: 5
	}, 
	
	medium: {
		oil_pressure: 40, 
		tire_pressure: 40,
		washer_fluid_level: 30
	}, 
	
	high: {
		oil_pressure: 90, 
		tire_pressure: 70,
		washer_fluid_level: 80
	}
};

$(function(){	
	var all_socket_inputs = $('input[socket_name]');
	all_socket_inputs.change(function(){
		var elem = $(this);
 		var socket_name = elem.attr('socket_name'), 
				form_values = []; 
		all_socket_inputs.each(function(){
			var form_elem = $(this);
			var data_pair = {
					input_name: form_elem.attr('socket_name')
				,	input_value: form_elem.val() 
			}
			form_values.push(data_pair); 
		});
		console.log("changed socket_name", socket_name, "form_values", form_values);
		socket.emit(socket_name, {socket_name: socket_name, data: form_values});
	});

	$('select#quick_config_select').change(function(){
		var elem = $(this);
		var config_values = QuickConfig[elem.val()];
		console.log("config selected", elem.val(), "config values", config_values);
		$.each(config_values, function(k,v){
			var form_element = $('input[socket_name="' + k + '"]')
			form_element.val(v);
			form_element.trigger('change');
		});
	});	
});

