
var art = 'images/art_icon.svg';
var cultural = 'images/culture_icon.svg';
var science = 'images/tech_icon.svg';

var initialMuseums = [
	{
	name: "Los Angeles County Museum of Art",
	location:{lat:34.06379, lng: -118.35889},
	type:art
	},
	{
	name: "Museum of Contemporary Art, Los Angeles",
	location:{lat:34.053265,
	lng:-118.250357},
	type: art
	},
	{
	name: "The Grammy Museum",
	location: {lat:34.044902,
		lng:-118.264815},
	type: art
	},
	{
	name: "Hollywood Wax Museum",
	location: {lat:34.10173,
	lng:-118.33809},
	type: art
	},
	{
	name: "Natural History Museum of Los Angeles County",
	location:{lat:34.01708,
	lng:-118.2886},
	type: science
	},
	{
	name: "California Science Center",
	location: {lat:34.01579,
	lng:-118.28621},
	type: science
	},
	{
	name: "La Brea Tar Pits",
	location: {lat:34.063796, lng:-118.355391},
	type: science
	},
	{
	name: "Petersen Automotive Museum",
	location: {lat:34.062357, lng:-118.361123},
	type: science
	},
	{
	name: "Psychiatry an Industry of Death",
	location:{lat:34.097768,lng:-118.333751},
	type: science
	},
	{
	name: "California African American Museum",
	location: {lat:34.015883,lng:-118.283430},
	type: cultural
	},
	{
	name: "Southwest Museum of the American Indian",
	location:{lat:34.100476,lng:-118.206010},
	type: cultural
	},
	{
	name: "Japanese American National Museum",
	location: {lat:34.049442,lng:-118.238767},
	type: cultural
	},
	{
	name: "Chinese American Museum",
	location: {lat:34.055629,lng:-118.239225},
	type: cultural
	},
	{
	name: "Los Angeles Museum of the Holocaust",
	location: {lat:34.074523,lng:-118.355702},
	type: cultural
	}
];

//String to display in info window
var content = '';

//Declare Map variable and markers array
var map;
var infowindow;
var markers=[];
var marker;
var google;
var initMap;

function Museum(value) {
    this.name = ko.observable(value.name);
    this.location = ko.observable(value.location);
    this.type = ko.observable(value.type);

}


//ViewModel
function ViewModel() {
	//map properties to initialize
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
			addMarkers();
		};

    var self = this;

		var infoString = '';
		var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ infoString	+' &format=json&callback=wikiCallback';
		self.museumList = ko.observableArray(initialMuseums);
		self.currentMuseum = ko.observable();
		console.log(self.museumList());//14 objects



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

				console.log(markers);//14 markers
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
					//ajax request on click
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
									 info = data[2].toString();
									console.log(info);
                    infowindow.setContent(info);
                    infowindow.open(map, marker);
                }
            });
        });
				});
					map.addListener('click', function() {
						map.setCenter({lat:34.076472, lng: -118.287430});
						map.setZoom(12);
						infowindow.close();
					});

						return markers;

		};

	// console.log(this.museumList());
	//when list item is clicked, marker will DROP animate and infowindow will open
	this.clickList = function(){
		infowindow.close();
		for (var i = 0; i < markers.length; i++) {
			if (this.name === markers[i].title){
				map.setCenter(markers[i].position);
				map.setZoom(16);
				content = markers[i].title;
				infowindow.open(map, markers[i]);
				infowindow.setContent(this.name);
				markers[i].setAnimation(google.maps.Animation.DROP);
				// self.query = ('');
				// console.log(self.query);
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
				 info = data[2].toString();
				console.log(info);
					infowindow.setContent(info);
					infowindow.open(map, marker);
			}
	});
		// document.getElementById('listItem').addListener('click',function(){
		// 	$.ajax({
		// 			url: 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ this.name 	+' &format=json&callback=wikiCallback',
		// 			dataType: "jsonp",
		// 			success: function(data) {
		// 				 articleList = data[2].toString();
		// 				console.log(articleList);
		// 					infowindow.setContent(articleList);
		// 					infowindow.open(map, marker);
		// 			}
		// 	});
		//
		// });

	};
	//query--search/filter variable to use for data bind
	self.query = ko.observable('');
	// self.getInfo = ko.computed(function(){
	// 	// console.log(infoString);
	// 	// $info = $('#infowin');
	// 	// console.log(self);
	// 	//
	// 	// var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ this.name 	+' &format=json&callback=wikiCallback';
	// 	//
	// 	// var wikiTimeout = setTimeout(function(){
	// 	// 	$info.text('unable to load any wiki information');
	// 	// },8000);
	// 	// $.ajax({
	//   //     url: wikiUrl,
	//   //     dataType: "jsonp",
	//   //     //jsonp: "callback",
	//   //     success: function(response){
	//   //         var articleList = response[1];
	//   //         console.log(articleList);
	// 	//
	//   //         for (var i = 0; i < articleList.length; i++){
	//   //           articleStr = articleList[i];
	// 	//
	//   //           var url = 'http://en.wikipedia.org/wiki/' + articleStr;
	//   //           $info.append('<li><a href="'+ url +'">' + articleStr +'</a></li>');
	//   //           clearTimeout(wikiTimeout);
	//   //         }
	//   //     }
	//   // });
	// 	// return false;
	// 	$.ajax({
	// 			url: 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ this.name +' &format=json&callback=wikiCallback',
	// 			dataType: "jsonp",
	// 			success: function(data) {
	// 				var articleList = data.toString();
	// 				console.log(articleList);
	// 					infowindow.setContent(articleList);
	// 					infowindow.open(map, marker);
	// 			}
	// 	});
	// 	// return false;
	// });
	self.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.museumList(), function(museum) {
					//Match search with items in museumList observable array
					var match = museum.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;//returns boolean value
					// && markers.length > 0
					var markerMatch;
					if(match){
						console.log(museum.name);
						markers.forEach(function(item){
							item.setVisible(true);
							});
						}
						// console.log(museum.name);
						// console.log(marker);
						markers.forEach(function(item){
							markerMatch = item.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
							// console.log(item);
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

var vm = new ViewModel();
ko.applyBindings(vm);
