// JavaScript Document

//*
device={
	'uuid':'3988505C-F36B-434B-9CD8-E0F39D2DA200',
	'manufacturer':'Apple',
	'version':'10.0.2',
	'platform':'iOS',
	'model':'iPhone7,2'
};
//*/

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};


function getSettings() {
	
	var uuid = window.localStorage.getItem("deviceuuid");
	
	var jqxhr = $.getJSON("https://quickmed.edifarm.com.ec/ws/mobile/login.php", {
			deviceuuid:uuid,
/*			deviceuuid: device.uuid,
			devicename: device.manufacturer,
			version: device.version,
			platform: device.platform,
			model: device.model,*/
			action: 'consultar',
		}, function () {
			var g=0;
		})
		.done(function (data) {

			var r = data.respuesta;
			var e = '';
			var u = '';
			var not = '0';
			var med = '0';
			
			if (r === '1') {


				u = data.datos.email;
				e = data.datos.nombre_usuario;
				if (u !== e) {
					$('#email').removeAttr('readonly');
				}

				$('#email').val(data.datos.email);
				$('#nombres').val(data.datos.fname);
				$('#apellidos').val(data.datos.lname);
				$('#telefono').val(data.datos.phone);
				$("#pais option").filter(function () {
					return $(this).text() === data.datos.country;
				}).prop('selected', true);
				$('#ciudad').val(data.datos.city);

				$('#cumple').val(data.datos.birth);
				not = data.datos.notification;
				if (not === '1') {
					$('#cmn-toggle-1').attr('checked', true);
				} else {
					$('#cmn-toggle-1').attr('checked', false);
				}
				med = data.datos.ismedic;
				if (med === '1') {
					$('#ismedic').attr('checked', true);
				} else {
					$('#ismedic').attr('checked', false);
				}


			} else {

				window.location = 'home.html';
			}

			$('.loader').fadeOut('slow');

		})
		.fail(function (data) {

			var error='Error' + JSON.stringify(data);
		})
		.always(function () {
			$('.loader').fadeOut('slow');
		});

	//*/

};




function successAnalytics() {
	//console.log('Funciona perfecto');
}

function failAnalytics() {
	consolel.log('No se conecta analytics');
}


window.ga.startTrackerWithId('UA-18919211-2', 30);

//*
//analytics.startTrackerWithId('UA-18919211-2', successAnalytics, failAnalytics);
//*/
