// Creating a link to the geojson file
var link = 'static/countries.geojson'

// Creating a map Object and zoomed out to show the world
var myMap = L.map("mapid", {
  center: [-5.067383325760818, 77.08252432997061],
  zoom: 3
});

// Adding a base map tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Creating a function that will highlight the colours of the continent for which country it belongs to
function chooseColor(continent){
  switch(continent){
    case "Asia":
      return "yellow";
    case "South Asia":
      return "orange";
    case "Central Asia":
      return "grey";
    case "West Asia":
      return "green";
    case "North America":
      return "blue";
    case "South America":
      return "purple";
    case "Oceania":
      return "cyan";
    case "Africa":
      return "red";
    case "Europe":
      return "pink";
    default:
      return "black";
  }
}

var geoJson;

// Loading the GeoJson Data
d3.json(link).then(function(data){

// Testing to see if the Geojson data loads
  console.log(data);

    // Creating a GeoJson layer with the dataset
  geoJson = L.geoJson(data,{

      // Adding style to the layer
    style: function(feature){
      return{
        color: 'white',

        // Calling the choose color function to add to the continents
        fillColor: chooseColor(feature.properties.Continent),
        fillOpacity: 0.5,
        weight: 1.5,
      }
    }
  }).addTo(myMap);
    // This code will return the selected country in which to filter the data and display information that is related to that particular country.
  geoJson.on('click', function(e){
    let chosenCountry = e.layer.feature.properties.ADMIN;
    d3.selectAll('#countrysel').html('');
    d3.selectAll('#performance').html('');
    d3.selectAll('#countrysel').append('h2').text(`${chosenCountry} against the Top Ten Countries`);
    d3.selectAll('#performance').append('h2').text(`${chosenCountry}'s 57 year performance`);  
    console.log(`Selected Country from Clicking Map ${chosenCountry}`);
    topTenCountries(chosenCountry);
    unPackData(chosenCountry);
     
    })
    
})















