// const KEY = require('./config.js').key;
// Bould, CO: equivalent to 40°00'54.0"N 105°16'14.0"W

  const mymap = L.map('map').setView([40, -98], 4.8);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaG91c2tlciIsImEiOiJjam54dDBrYzgwMDc4M3dzeW8zYjI5bG1xIn0.VvZ9IEKgrxikDxoiLvCN6A'
}).addTo(mymap);

let locationEl = document.getElementById('currLocation');
let radius = 1;
let results = [];
let currLocation, budget, layer, circle, inDebounce;

function debounce(func, delay) {
  const context = this;
  const args = arguments;
  clearTimeout(inDebounce);
  inDebounce = setTimeout(() => func.apply(context, args), delay);
}

function search() {
  fetch(`/search/${radius}/${currLocation}/${budget}`)
  .then(resp => {
    results = ['Testing1', 'Testing2', 'Testing3'];
    let elements = results.map(element => {
      let el = document.createElement('p')
      el.innerHTML = element;
      return el;
    });
    let reslist = document.getElementById('reslist');
    while (reslist.firstChild) {
        reslist.removeChild(reslist.firstChild);
    }
    elements.forEach(el => reslist.appendChild(el));
    console.log(resp);
  });
}

function selectRadius(e) {
  radius = e.value;
  if(currLocation) {
    onMapClick({ latlng: { lat: currLocation[0], lng: currLocation[1] } });
  }
  if(radius && currLocation && budget) {
    search();
  }
}

function enterBudget(e) {
  debounce(function() {
    budget = e.value;
    if(radius && currLocation && budget) {
      search();
    }
  }, 400);
}

function onMapClick(e) {
  currLocation = [e.latlng.lat, e.latlng.lng];
  locationEl.value = `${Math.round(e.latlng.lat * 100) / 100}, ${Math.round(e.latlng.lng * 100) / 100}`;
  if(layer) {
    layer.remove();
  }
  if(circle) {
    circle.remove();
  }
  layer = L.marker(e.latlng).addTo(mymap);
  circle = L.circle(e.latlng, {
    color: '#abc1d5',
    fillColor: '#abc1d5',
    fillOpacity: 0.4,
    radius: radius * 1609.344
  }).addTo(mymap);
  if(radius && currLocation && budget) {
    search();
  }
}

mymap.on('click', onMapClick);


// window.onload = function() {
//   console.log('hi')

// }
