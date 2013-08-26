var gps;

function geoGetPosition()
{	gps=$('.gps');
	navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, { maximumAge: 3000, timeout: 8000, enableHighAccuracy: true });
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

function onMapGeoSuccess(position) {
	if(map===false)
    { 	alert('Map not loaded!');
		position={timestamp:d.getTime(),coords:{latitude:5,speed:20,accuracy:'none'}};
    }
	var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	map.panTo(myLocation);
}
 // Error
function onGeoError() {
    alert('onError!');
    $('button.geo').removeClass('blink');
}