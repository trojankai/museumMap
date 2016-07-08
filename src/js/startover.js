//model in model.js

//Declare global Map variable

var map;
var initMap;
var google;

function Museum(value) {
    this.name = ko.observable(value.name);
    this.location = ko.observable(value.location);
    this.type = ko.observable(value.type);

}


//ViewModel
function ViewModel() {
	//map  and properties to initialize
		initMap = function(){
			var myLatLng = {lat:34.076472, lng: -118.287430};
			var styleArray = [
			{
				featureType: "all",
				stylers: [
				 { saturation: -90 }
				]
			},{
				featureType: "road.arterial",
				elementType: "geometry",
				stylers: [
					{ hue: "#ff8383" },
					{ saturation: 60 }
				]
			},{
				featureType: "poi.business",
				elementType: "labels",
				stylers: [
					{ visibility: "off" }
				]
			}
		];
			var mapOptions = {
				center: myLatLng ,
				zoom: 11,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				draggable: true,
				disableDefaultUI: true,
				styles: styleArray
			};
			map = new google.maps.Map(document.getElementById('map'),mapOptions);
			//adds markers to map
			addMarkers();
		};

    var self = this;
		var infowindow;
		var markers = [];
		var marker;
		var infoString = ko.observable('');
		self.museumList = ko.observableArray(initialMuseums);
		// self.currentMuseum = ko.observable();
		// console.log(self.museumList());//14 objects



		//set up markers for museum array
	 var addMarkers = function() {
			for (var i = 0; i < self.museumList().length; i++) {
				marker = new google.maps.Marker({
					position: self.museumList()[i].location,
					map: map,
					title: self.museumList()[i].name,
					icon:self.museumList()[i].type,
					animation: google.maps.Animation.DROP
				});
				markers.push(marker);
			}

				// console.log(markers);//14 markers
				// Map infowindows to each marker in markers array
				markers.forEach(function(marker){
				//create infowindow for each marker in the marker array
					infowindow = new google.maps.InfoWindow({
					});
					//on click marker will bounce, set marker to center and zoom in to location
					marker.addListener('click',function(){
						map.panTo(this.position);
						map.setZoom(16);
						infowindow.open(map, this);
						infowindow.setContent(marker.title);
						marker.setAnimation(google.maps.Animation.BOUNCE);

						setTimeout(function(){
							marker.setAnimation(null);
						},2000);//stops bouncing after 2 seconds
					});
					//ajax request on marker click
					google.maps.event.addListener(marker, "click", function()
        {
							infoString = this.title;
							var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ infoString	+' &format=json&callback=wikiCallback';
					  // Make an AJAX request to get the data
            // The return will be put into the InfoWindow
            $.ajax({
                url: wikiUrl,
								dataType: "jsonp",
                success: function(data) {
									 info = data[2][0].toString();
									 var link = data[3];
									infowindow.setContent(infoString.link(link)+':'+' '+info);
                  infowindow.open(map, marker);
									infowindow.setOptions({maxWidth:200});
                },
                error: function(){
                  infowindow.setContent('Unable to get info about '+ infoString+ ' '+'just know that it is AWESOME');
                  infowindow.setOptions({maxWidth:200});
                }
						});

        });
				});
					map.addListener('click', function() {
						map.setCenter({lat:34.076472, lng: -118.287430});
						map.setZoom(11);
						infowindow.close();
					});

						return markers;

		};

	// console.log(this.museumList());
	//when list item is clicked, marker will DROP animate and infowindow will open
	this.clickList = function(){
		map.setCenter({lat:34.076472, lng: -118.287430});
		infowindow.close();
		for (var i = 0; i < markers.length; i++) {
			if (this.name === markers[i].title){
				map.setCenter(markers[i].position);
				map.setZoom(16);
				infowindow.open(map, markers[i]);
				infowindow.setContent(this.name);
				markers[i].setAnimation(google.maps.Animation.DROP);
		}

		}//end of for loop
		infoString = this.name;
		var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ infoString	+' &format=json&callback=wikiCallback';

	// Make an AJAX request to get the data
	// The return will be put into the InfoWindow
		$.ajax({
				url: wikiUrl,
				dataType: "jsonp",
				success: function(data) {
				  info = data[2][0].toString();
				  var link = data[3];
					infowindow.setContent(infoString.link(link)+':'+' '+info);
					infowindow.setOptions({maxWidth:150});
				},
        error: function(){
          infowindow.setContent('Unable to get info about '+ infoString+ ' '+'just know that it is AWESOME');
          infowindow.setOptions({maxWidth:150});
        }
			});
	};
	//query--search/filter variable to use for data bind
	self.query = ko.observable('');

	self.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.museumList(), function(museum) {
					//Match search with items in museumList observable array
					var match = museum.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;//returns boolean value
					// && markers.length > 0
					var markerMatch;
					if(match){
							markers.forEach(function(item){
							item.setVisible(true);
							});
						}
					markers.forEach(function(item){
							markerMatch = item.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
							// console.log(item);
							//if name attached to marker and museum dont match, markers will disappear
							if(!markerMatch && museum.name !== item.title){
								item.setVisible(false);

								// console.log(markerMatch);
							} else if (markerMatch && museum.name === item.title) {
								item.setVisible(true);
							}
							return markerMatch;
					});

					return match;
			});
	});
}//end of ViewModel

//instantiate new ViewModel
var vm = new ViewModel();
ko.applyBindings(vm);


//toggle function for help_btn

$('#help_btn').click(function(){
	$('.help_info').slideToggle(400);
});

//error handler for map
function gMapError(){

	alert('unable to load map, please refresh the page');


}
