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

// constructor function
function Museum(data) {
  this.name = ko.observable(data.name);
  this.location = ko.observable(data.location);
  this.type = ko.observable(data.type);

}

//global declarations to insure in scope

var map;
var marker;
var infowindow;
var markers = [];
var google;
// var initialize;

var artIcon = 'images/museum-512.svg';
//ViewModel
function ViewModel(){
	var self = this;

	//copies initialMuseums to observableArray
	self.museumList = ko.observableArray(initialMuseums.slice());
	console.log(self.museumList());

	//set mapOptions and link to DOM
	initialize = function(){
		var myLatLng = {lat:34.076472, lng: -118.287430};
		var mapOptions = {
			center: myLatLng ,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			disableDefaultUI: true
		};
		map = new google.maps.Map(document.getElementById('map'),mapOptions);
	//set marker for locations in the museumlist
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


	// Map infowindows to each marker in markers array
	markers.forEach(function(marker){
	//create infowindow for each marker in the marker array
		infowindow = new google.maps.InfoWindow({
			content: ''
		});

		//on click marker will bounce
		marker.addListener('click',function(){
			infowindow.open(map, this);
			infowindow.setContent(marker.title +'<br>'+ marker.label);
			marker.setAnimation(google.maps.Animation.BOUNCE);

			setTimeout(function(){
				marker.setAnimation(null);
			},2000);//stops bouncing after 2 seconds
		});
	});
};//map
	var listViewClick = function(museum) {
		if (this.name) {
				// 	console.log(this.name);
			 map.setZoom(16); //Zoom map view
			 map.panTo(this.location); // Pan to correct marker when list view item is clicked
			 infowindow.open(map, museum.location);
			//  for (var i = 0; i > self.museumList();i++){
			//
			// 	 console.log(markers[i]);
			// 	 if (this.name === markers[i].title){
			// 	 markers[i].setAnimation(google.maps.Animation.BOUNCE); // Bounce marker when list view item is clicked
			//
			// 	  // Open info window on correct marker when list item is clicked
			// 	 self.query(this.name);
			//  }
			//  console.log(markers[this]);
			// //  console.log(this);
			//
			//  }
		 }
				setTimeout(function() {
						this.marker.setAnimation(null); // End animation on marker after 2 seconds
				}, 2000);
};
	//declares current Museum--per catclicker example
	self.currentMuseum = ko.observable(this.museumList()[0]);
	//sets query observable for search/filtering museumList
	self.query = ko.observable('');


// 	self.search = function(value) {
// 		self.museumList().length = 0;
// 		console.log(self.museumList());
// 		for(var x in initialMuseums) {
//       if(initialMuseums[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
//         self.museumList().push(initialMuseums[x]);
// 	}
// }};

}//end of ViewModel


// viewM is a new instance of viewModel
var viewM = new ViewModel();


// activates ko bindings on viewM
ko.applyBindings(viewM);
