/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var $navi;
var slider;

var app = {
		
	
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	if(!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    		setTimeout(function() { app.onDeviceReady(); }, 500); //this is the browser
      	} else {
      	   	document.addEventListener("deviceready", app.DeviceReady, false);
      	}
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        slider = new PageSlider($(".app"));
        $('.app').html('');
        $navi = $('#navi');
        route();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);

// The dynamically built HTML pages. In a real-life app, In a real-life app, use Handlerbar.js, Mustache.js or another template engine
var homePage =
    '<div id="home">' +
        '<div class="scroller">' +
            '<ul class="list">' +
                '<li><a href="#debug"><strong>Build Bot</strong></a></li>' +
                '<li><a href="#page2"><strong>Medi Bot</strong></a></li>' +
                '<li><a href="#page3"><strong>Ripple Bot</strong></a></li>' +
            '</ul>' +
        '</div>' +
    '</div>';

var detailsPage =
    '<div>' +
        '<div class="scroller">' +
            '<div class="robot">' +
                '<img src="images/{{img}}"/>' +
                '<h2>{{name}}</h2>' +
                '<p>{{description}}</p>' +
            '</div>' +
        '</div>' +
    '</div>';

$(window).on('hashchange', route);

// Basic page routing
function route(event) {
	console.log('route');
    var page,
    	id,
        hash = window.location.hash;
    if(hash==='') hash='#home';
    
    $page=$(hash);
    if($page.length==0)
    {	
	        
	    if (hash === "#debug") {
	        page = merge(detailsPage, {img: "buildbot.jpg", name: "DEBUG", description: "Debuggy debuggy buggity bug."});
	        id='debug';
	//        slider.slide($(page), "right");
	    } else if (hash === "#page2") {
	        page = merge(detailsPage, {img: "medibot.jpg", name: "Medi Bot", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."});
	        id='page2';
	//        slider.slide($(page), "right");
	    } else if (hash === "#page3") {
	        page = merge(detailsPage, {img: "ripplebot.jpg", name: "Ripple Bot", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."});
	        id='page3';
	//        slider.slide($(page), "right");
	    }
	    else {
	        page = homePage;
	        id='home';
	        
	//        slider.slide($(homePage), "left");
	    }
	    $page=$(page);
	    $page.attr('id',id);
	}
    pageLeave(slider.getCurrentPage());
    pageEnter($page);
    if(hash==='#debug') slider.slidePageFrom($page,'left');
    else slider.slidePage($page);
    
}


function pageLeave(page)
{	console.log(page);
	if(typeof page === 'undefined') return;
	id=page.attr('id');
	if(id=='home')
	{	$navi.find('.debug').remove();
	}
}

function pageEnter(page)
{	if(typeof page === 'undefined') return;
	
	id=page.attr('id');
	if(id=='home')
	{	$navi.prepend('<a href="#debug" class="topcoat-button debug left">Debug</a>');
		
	}
}
// Primitive template processing. In a real-life app, use Handlerbar.js, Mustache.js or another template engine
function merge(tpl, data) {
    return tpl.replace("{{img}}", data.img)
              .replace("{{name}}", data.name)
              .replace("{{description}}", data.description);
}
