var map;
			
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 25.0826209, lng: 121.5808322},
		zoom: 13,
		styles: [
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
							"hue": "#7fc8ed"
					},
					{
							"saturation": 55
					},
					{
							"lightness": -6
					},
					{
							"visibility": "on"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [
					{
							"hue": "#7fc8ed"
					},
					{
							"saturation": 55
					},
					{
							"lightness": -6
					},
					{
							"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
							"hue": "#83cead"
					},
					{
							"saturation": 1
					},
					{
							"lightness": -15
					},
					{
							"visibility": "on"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{
							"hue": "#f3f4f4"
					},
					{
							"saturation": -84
					},
					{
							"lightness": 59
					},
					{
							"visibility": "on"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "labels",
				"stylers": [
					{
							"hue": "#ffffff"
					},
					{
							"saturation": -100
					},
					{
							"lightness": 100
					},
					{
							"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
							"hue": "#ffffff"
					},
					{
							"saturation": -100
					},
					{
							"lightness": 100
					},
					{
							"visibility": "on"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels",
				"stylers": [
					{
							"hue": "#bbbbbb"
					},
					{
							"saturation": -100
					},
					{
							"lightness": 26
					},
					{
							"visibility": "on"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
							"hue": "#ffcc00"
					},
					{
							"saturation": 100
					},
					{
							"lightness": -35
					},
					{
							"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
							"hue": "#ffcc00"
					},
					{
							"saturation": 100
					},
					{
							"lightness": -22
					},
					{
							"visibility": "on"
					}
				]
			},
			{
				"featureType": "poi.school",
				"elementType": "all",
				"stylers": [
					{
							"hue": "#d7e4e4"
					},
					{
							"saturation": -60
					},
					{
							"lightness": 23
					},
					{
							"visibility": "on"
					}
				]
			}
		]
	});

	getData();
}

var data;

function getData() {
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'data.json', true);
	xhr.send();
	xhr.onload = function() {
		data = JSON.parse(xhr.responseText);
		dataLen = data.result.results.length
		for(var i = 0; i < dataLen; i++) {
			var str = {};
			var location = {};

			location.lat = Number(data.result.results[i].LAT);
			location.lng = Number(data.result.results[i].LON);
			
			str.map = map;
			str.title = data.result.results[i].ORG_NAME;
			str.position = location;
			var marker = new google.maps.Marker(str);
			showData(marker, str.title);
		}	
	}
}

var currentInfoWindow = '';
function showData(marker, orgName) {
	var infowindow = new google.maps.InfoWindow({
		content: orgName
	});
	
	marker.addListener('click', function(){
		if(currentInfoWindow != '') {
			currentInfoWindow.close();
			currentInfoWindow = '';
		}

		infowindow.open(map, marker);
		currentInfoWindow = infowindow;
	});
}