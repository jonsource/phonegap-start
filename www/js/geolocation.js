var gps;

function geoGetPosition()
{	gps=$('.gps');
	navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, { maximumAge: 3000, timeout: 4000, enableHighAccuracy: true });
	console.log('getting position');
}

function onGeoSuccess(position) {
	if(!native)
    { 	d = new Date;
		position={timestamp:d.getTime(),coords:{latitude:5,speed:20,accuracy:'none'}};
    }
    gps.html('Latitude: '           + position.coords.latitude              + '<br />' +
        'Longitude: '          + position.coords.longitude             + '<br />' +
        'Altitude: '           + position.coords.altitude              + '<br />' +
        'Accuracy: '           + position.coords.accuracy              + '<br />' +
        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
        'Heading: '            + position.coords.heading               + '<br />' +
        'Speed: '              + position.coords.speed                 + '<br />' +
        'Timestamp: '          + new Date(position.timestamp)          + '<br />');
    gps.offsetWidth;
    $('button.geo').removeClass('blink');
}
 // Error
function onGeoError() {
    alert('onError!');
    $('button.geo').removeClass('blink');
}