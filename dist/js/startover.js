function Museum(e){this.name=ko.observable(e.name),this.location=ko.observable(e.location),this.type=ko.observable(e.type)}function ViewModel(){initMap=function(){var e={lat:34.076472,lng:-118.28743},t=[{featureType:"all",stylers:[{saturation:-90}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{hue:"#ff8383"},{saturation:60}]},{featureType:"poi.business",elementType:"labels",stylers:[{visibility:"off"}]}],o={center:e,zoom:11,mapTypeId:google.maps.MapTypeId.ROADMAP,draggable:!0,disableDefaultUI:!0,styles:t};map=new google.maps.Map(document.getElementById("map"),o),i()};var e,t,o=this,n=[],a=ko.observable("");o.museumList=ko.observableArray(initialMuseums);var i=function(){for(var i=0;i<o.museumList().length;i++)t=new google.maps.Marker({position:o.museumList()[i].location,map:map,title:o.museumList()[i].name,icon:o.museumList()[i].type,animation:google.maps.Animation.DROP}),n.push(t);return n.forEach(function(t){e=new google.maps.InfoWindow({}),t.addListener("click",function(){map.panTo(this.position),map.setZoom(16),e.open(map,this),e.setContent(t.title),t.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){t.setAnimation(null)},2e3)}),google.maps.event.addListener(t,"click",function(){a=this.title;var o="http://en.wikipedia.org/w/api.php?action=opensearch&search="+a+" &format=json&callback=wikiCallback";$.ajax({url:o,dataType:"jsonp",success:function(o){info=o[2][0].toString();var n=o[3];e.setContent(a.link(n)+": "+info),e.open(map,t),e.setOptions({maxWidth:200})},error:function(){e.setContent("Unable to get info about "+a+" just know that it is AWESOME"),e.setOptions({maxWidth:200})}})})}),map.addListener("click",function(){map.setCenter({lat:34.076472,lng:-118.28743}),map.setZoom(11),e.close()}),n};this.clickList=function(){map.setCenter({lat:34.076472,lng:-118.28743}),e.close();for(var t=0;t<n.length;t++)this.name===n[t].title&&(map.setCenter(n[t].position),map.setZoom(16),e.open(map,n[t]),e.setContent(this.name),n[t].setAnimation(google.maps.Animation.DROP));a=this.name;var o="http://en.wikipedia.org/w/api.php?action=opensearch&search="+a+" &format=json&callback=wikiCallback";$.ajax({url:o,dataType:"jsonp",success:function(t){info=t[2][0].toString();var o=t[3];e.setContent(a.link(o)+": "+info),e.setOptions({maxWidth:150})},error:function(){e.setContent("Unable to get info about "+a+" just know that it is AWESOME"),e.setOptions({maxWidth:150})}})},o.query=ko.observable(""),o.search=ko.computed(function(){return ko.utils.arrayFilter(o.museumList(),function(e){var t,a=e.name.toLowerCase().indexOf(o.query().toLowerCase())>=0;return a&&n.forEach(function(e){e.setVisible(!0)}),n.forEach(function(n){return t=n.title.toLowerCase().indexOf(o.query().toLowerCase())>=0,t||e.name===n.title?t&&e.name===n.title&&n.setVisible(!0):n.setVisible(!1),t}),a})})}function gMapError(){alert("unable to load map, please refresh the page")}var map,initMap,google,vm=new ViewModel;ko.applyBindings(vm),$("#help_btn").click(function(){$(".help_info").slideToggle(400)});