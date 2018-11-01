// https://en.wikipedia.org/wiki/Knapsack_problem
// https://docs.google.com/document/d/e/2PACX-1vQuzq3cnLcsOhIrnAUDBc_WkhvdQEh7rORF2VMos6LAMzPJcdcrBvGZyKnlDzY2Pl7C4P9rRCJab-rT/pub

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/client`));

app.get('/search/:radius/:location/:budget', (req, res) => {
  // console.log(req.params.radius)
  // console.log(req.params.location)
  // console.log(req.params.budget)
  res.send('hi you');
})

// var statueOfLiberty = new GeoPoint(40.689604, -74.04455);

var sampleLocation = [40.689604, -74.04455];
var sampleRadius = 5;

// console.log(statueOfLiberty.boundingCoordinates(5, 5))

//location = [lat, lon]
function calcBounds(location, radius) {
  let milesInLonDeg = 69.2 * Math.cos(location[0] / 180.0 * Math.PI);
  let deltaLat = radius / 69;
  let deltaLon = radius / milesInLonDeg;
  return {
    minLat: location[0] - deltaLat,
    maxLat: location[0] + deltaLat,
    minLon: location[1] - deltaLon,
    maxLon: location[1] + deltaLon
  }
}

app.listen(PORT);

// console.log(calcBounds(sampleLocation, sampleRadius))

// /https://www.thoughtco.com/degree-of-latitude-and-longitude-distance-4070616
// https://stackoverflow.com/questions/23117989/get-the-max-latitude-and-longitude-given-radius-meters-and-position


// kmInLongitudeDegree = 111.320 * Math.cos( latitude / 180.0 * Math.PI)
// Combining this, it's easy to get deltas of latitude and longitude that will cover your circle:

// deltaLat = radiusInKm / 111.1;
// deltaLong = radiusInKm / kmInLongitudeDegree;

// minLat = lat - deltaLat;
// maxLat = lat + deltaLat;
// minLong = long - deltaLong;
// maxLong = long + deltaLong;

