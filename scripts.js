// map feature
var myMap = L.map('mapid').setView([37.0902, -95.7129], 4); // lat, lon, zoom

// custom icons
var greenIcon = L.icon({
  iconUrl: 'icon.png', // icon path
  iconSize:     [40, 40], // size of the icon
  iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
});

// baselayer from mapbox
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FvaG1hIiwiYSI6ImNqcHE2ZzZ6bTA0ZGo0OG1oNDBob21sbG0ifQ.yLVgGtTBOaYeLihbrrrFPA'
}).addTo(myMap);

var nationalParks;
getData();

function getData() {
  fetch('https://whateverly-datasets.herokuapp.com/api/v1/nationalParks1810')
  .then(data => data.json())
  .then(data => nationalParks = data.nationalParks1810)
  .then(data => {
    displayParks();
  })
  .catch(error => console.log(error))
}

function displayParks() {
  nationalParks.forEach(park => {
    let lat = (park.latitude.includes('N')) ? park.latitude.replace(/.N$/, '') : park.latitude.replace(/.S$/, '').replace(/^/, '-');
    let lon = (park.longitude.includes('E')) ? park.longitude.replace(/.E$/, '') : park.longitude.replace(/.W$/, '').replace(/^/, '-');
    // add each marker to our map here
    L.marker([lat, lon], { icon: greenIcon }).addTo(myMap).bindPopup(`
        <h2 class="name-text">${park.parkName}</h2>
        <img class="icon-images" src="${park.image}"/>
        <a href=${park.websiteUrl}>Link to Park Webpage</p>
      `);
  });
}
