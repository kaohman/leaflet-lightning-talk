var myMap = L.map('mapid').setView([37.0902, -95.7129], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FvaG1hIiwiYSI6ImNqcHE2ZzZ6bTA0ZGo0OG1oNDBob21sbG0ifQ.yLVgGtTBOaYeLihbrrrFPA'
}).addTo(myMap);

var popup = L.popup();

myMap.on('click', onMapClick);


loadJSON(function(response) {
  const jsonObj = JSON.parse(response);
  showSources(jsonObj);
});

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(myMap);
}

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', 'national-parks.json', true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function showSources(jsonObj) {
  const sourceNames = jsonObj.map(obj => {
    return obj.source;
  });

  jsonObj.forEach(park => {
    let lat = (park.latitude.includes('N')) ? park.latitude.replace(/.N$/, '') : park.latitude.replace(/.S$/, '').replace(/^/, '-');
    let lon = (park.longitude.includes('E')) ? park.longitude.replace(/.E$/, '') : park.longitude.replace(/.W$/, '').replace(/^/, '-');
    L.marker([lat, lon]).addTo(myMap);
  });
}