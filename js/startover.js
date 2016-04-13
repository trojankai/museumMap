//model
var initialMuseums = [
	{
	name: "Los Angeles County Museum of Art",
	location:{lat:34.06379, lng: -118.35889},
	type:"art"
	},
	{
	name: "Museum of Contemporary Art, Los Angeles",
	location:{lat:34.053265,
	lng:-118.250357},
	type:"art"
	},
	{
	name: "The Grammy Museum",
	location: {lat:34.044902,
		lng:-118.264815},
	type:"art"
	},
	{
	name: "Hollywood Wax Museum",
	location: {lat:34.10173,
	lng:-118.33809},
	type:"art"
	},
	{
	name: "Natural History Museum of Los Angeles County",
	location:{lat:34.01708,
	lng:-118.2886},
	type:"science"
	},
	{
	name: "California Science Center",
	location: {lat:34.01579,
	lng:-118.28621},
	type:"science"
	},
	{
	name: "La Brea Tar Pits",
	location: {lat:34.063796, lng:-118.355391},
	type:"science"
	},
	{
	name: "The Peterson Automotive Museum",
	location: {lat:34.062357, lng:-118.361123},
	type:"science"
	},
	{
	name: "Psychiatry an Industry of Death(aka Scientology <em>Propognada</em> Museum)",
	location:{lat:34.097768,lng:-118.333751},
	type:"science"
	},
	{
	name: "California African American Museum",
	location: {lat:34.015883,lng:-118.283430},
	type:"cultural"
	},
	{
	name: "Southwest Museum of the American Indian",
	location:{lat:34.100476,lng:-118.206010},
	type:"cultural"
	},
	{
	name: "Japanese American National Museum",
	location: {lat:34.049442,lng:-118.238767},
	type:"cultural"
	},
	{
	name: "Chinese American Museum",
	location: {lat:34.055629,lng:-118.239225},
	type:"cultural"
	},
	{
	name: "Los Angeles Museum of the Holocaust",
	location: {lat:34.074523,lng:-118.355702},
	type:"cultural"
	}
];
//String to display in info window
var content = '';

//Declare Map variable and markers array
var map;
var infoWindow;
var markers = [];
var marker;
var google;



//Create Instance of a map from the Google maps api
//Grab the reference to the "map" id to display map
//Set the map options object properties


// tells the view model what to do when a change occurs
function Museum(value) {
    this.name = ko.observable(value.name);
    this.location = ko.observable(value.location);
    this.type = ko.observable(value.type);

}

//initialize map

//ViewModel
function ViewModel() {

	initMap = function(){
		var myLatLng = {lat:34.076472, lng: -118.287430};
		var mapOptions = {
			center: myLatLng ,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			disableDefaultUI: true
		};
		map = new google.maps.Map(document.getElementById('map'),mapOptions);

	};

    var self = this;

		self.museumList = ko.observableArray(initialMuseums);

		console.log(self.museumList());//14

		//query--search/filter variable to use for bind
		self.query = ko.observable('');

		//set up markers for museum array
		var addMarkers = function() {
			// for (var i = 0; i < self.museumList().length; i++) {
			// 	marker = new google.maps.Marker({
			// 		position: self.museumList()[i].location,
			// 		map: map,
			// 		title: self.museumList()[i].name,
			//
			// 	});
			// 	// console.log(museumLocation);
			// 	// 	console.log(marker);
			// 	markers.push(marker);
			// 	console.log(markers.length);
			// }
			self.museumList().forEach(function(museumLocation){
					marker = new google.maps.Marker({
						position: museumLocation.location,
						map:map,
						label: museumLocation.type,
						title: museumLocation.name,
						icon:artIcon,
						animation: google.maps.Animation.DROP
					});
				// console.log(museumLocation);
				// 	console.log(marker);
				markers.push(marker);
			});
		};
		addMarkers();



}//end of ViewModel
var vm = new ViewModel();
ko.applyBindings(vm);
