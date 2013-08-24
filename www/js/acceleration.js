// Start watching the acceleration
var meter;
var watchID;

function accelStartWatch() {
    // Update acceleration every 3 seconds
	var options = { frequency: 300 };
	
	meter = $('.accelerometer');
	console.log(meter);
	if(!native) {
		
    	watchID = setInterval(function(){
    		d = new Date;
    		acceleration = {timestamp:d.getTime()};
    		onAccelSuccess(acceleration);
    		
    	},300);
    }
    else watchID = navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, options);
    
    
}
// Stop watching the acceleration
function accelStopWatch() {
    if (watchID) {
        if(!native)
        { 	clearInterval(watchID);
        }
        else navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}
// Success
function onAccelSuccess(acceleration) {
    meter.html('Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />');
    meter.offsetWidth;
}
 // Error
function onAccelError() {
    alert('onError!');
}