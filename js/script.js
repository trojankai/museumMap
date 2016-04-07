//model
var initialMuseums = [
	{
	name: "Los Angeles County Museum of Art",
	location:{lat:34.06379, lng: -118.35889},
	type:"art"
	},
	{
	name: "Museum of Contemporary Art, Los Angeles",
	location:{lat:34.052234,
	lng:-118.243685},
	type:"art"
	},
	{
	name: "The Grammy Museum",
	location: {lat:34.044820,
		lng:-118.265384},
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
// constructor function
function Museum(data) {
  this.name = ko.observable(data.name);
  this.location = ko.observable(data.location);
  this.type = ko.observable(data.type);

}

var map;
var marker;
var infowindow;
var i;
var content = 'vm.museumList().name';


//initialize map

function initMap(){
  var myLatLng = {lat: 34.09, lng: -118.2886};
  var mapOptions = {
    center: myLatLng ,
    zoom: 12,
    draggable: true,
    disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById('map'),mapOptions);
}
initMap();

//ViewModel

function ViewModel(){
	var self = this;
	markers = [];


	self.museumList = ko.observableArray(initialMuseums);
	// console.log(self.museumList());

//makes a marker for each museum
	self.museumList().forEach(function(museumLocation){
			marker = new google.maps.Marker({
				position: museumLocation.location,
				map:map,
				icon:'images/art.svg',
				animation: google.maps.Animation.DROP
			});
			// console.log(markers);
		markers.push(marker);
	});

//Map infowindows to each marker in markers array
	markers.forEach(function(marker){
		infowindow = new google.maps.InfoWindow({
			content: content
		});
		//on click marker will bounce
		marker.addListener('click',function(){
			infowindow.open(map, this);
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){
				marker.setAnimation(null);
			},2000);//stops bouncing after 2 seconds
		});

		console.log(infowindow);
	});




	//declares current Museum
	self.currentMuseum = ko.observable(this.museumList()[0]);

//sets query observable for search/filtering museumList
self.query = ko.observable('');




}//end of ViewModel
var vm = new ViewModel();
$(document).ready(function() {
    ko.applyBindings(vm);
});
