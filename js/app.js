//model
var initialMuseums = [
	{
	title: "Los Angeles County Museum of Art",
	location:{lat:34.06379, lng: -118.35889},
	type:"art"
	},
	{
	title: "Museum of Contemporary Art, Los Angeles",
	location:{lat:34.052234,
	lng:-118.243685},
	type:"art"
	},
	{
	title: "The Grammy Museum",
	location: {lat:34.044820,
		lng:-118.265384},
	type:"art"
	},
	{
	title: "Hollywood Wax Museum",
	location: {lat:34.10173,
	lng:-118.33809},
	type:"art"
	},
	{
	title: "Natural History Museum of Los Angeles County",
	location:{lat:34.01708,
	lng:-118.2886},
	type:"science"
	},
	{
	title: "California Science Center",
	location: {lat:34.01579,
	lng:-118.28621},
	type:"science"
	},
	{
	title: "La Brea Tar Pits",
	location: {lat:34.063796, lng:-118.355391},
	type:"science"
	},
	{
	title: "The Peterson Automotive Museum",
	location: {lat:34.062357, lng:-118.361123},
	type:"science"
	},
	{
	title: "Psychiatry an Industry of Death(aka Scientology <em>Propognada</em> Museum)",
	location:{lat:34.097768,lng:-118.333751},
	type:"science"
	},
	{
	title: "California African American Museum",
	location: {lat:34.015883,lng:-118.283430},
	type:"cultural"
	},
	{
	title: "Southwest Museum of the American Indian",
	location:{lat:34.100476,lng:-118.206010},
	type:"cultural"
	},
	{
	title: "Japanese American National Museum",
	location: {lat:34.049442,lng:-118.238767},
	type:"cultural"
	},
	{
	title: "Chinese American Museum",
	location: {lat:34.055629,lng:-118.239225},
	type:"cultural"
	},
	{
	title: "Los Angeles Museum of the Holocaust",
	location: {lat:34.074523,lng:-118.355702},
	type:"cultural"
	}
];
// constructor function
function Museum(data) {
  this.title = ko.observable(data.title);
  this.location = ko.observable(data.location);
  this.type = ko.observable(data.type);

}

var map;
var marker;
var infowindow;
var initMap;
var content;
var google;


function ViewModel(){
  var self = this;
	markers = [];

	//array of object instead of array of Museums
	self.museumList = ko.observableArray(initialMuseums);



	//declares current Museum
	self.currentMuseum = ko.observable(this.museumList()[0]);

	//sets query observable for search/filtering museumList
	self.query = ko.observable('');

	self.search = ko.computed(function() {
	        return ko.utils.arrayFilter(self.museumList(), function(listResult) {
	            //Match search with items in sortedLocations() observable array
	            var match = listResult.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;

	            // if (match) { //If result is true, show correct marker based off users search
	            //     listResult.marker.setVisible(true);
							//
	            // } else {
	            //     listResult.marker.setVisible(false); //hide markers that do not show users search results
	            // }
							//
	            // return match;

	        });
	    });


	//initialize map
  initMap = function() {
      var myLatLng = {lat: 34.01708, lng: -118.2886};
      //set map options
      var mapOptions = {
        center: myLatLng ,
        zoom: 12,
        draggable: true,
        disableDefaultUI: true

      };
      //instantiate new map
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
			addMarkers();
		};

      var len = self.museumList().length;

			//set marker for each location in museum list
			//places markers and sets infowindow
	var addMarkers = function(){
			// clearMarkers();
			for (i = 0; i < len; i++) {
      marker = new google.maps.Marker({
             position: new google.maps.LatLng(self.museumList()[i].location),
             label: self.museumList()[i].type,
						 title: self.museumList()[i].title,
             map: map,
             animation: google.maps.Animation.DROP
        });
			//adds markers to the markers array
				markers.push(marker);
      //initialize infowindow for markers
    infowindow = new google.maps.InfoWindow({
        });
    //opens infowindow when marker is clicked, also sets content of the inforwindow
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
           return function() {
               infowindow.setContent(content);
               infowindow.open(map, marker);
							 //marker bounces on click
							 marker.setAnimation(google.maps.Animation.BOUNCE);
							 //stops bounce animation after 2 seconds
							 setTimeout(function() {
									 marker.setAnimation(null)
							 }, 2000);

           };
      })(marker, i));

      }

  };


//initialize map and markers/infowindows



//AJAX requests for content
//wikipedia

}
var vm = new ViewModel();

ko.applyBindings(vm);
