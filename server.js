const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/client`));

app.get('/search/:radius/:lat/:lon/:budget', (req, res) => {
  findPossibilities(req.params.lat, req.params.lon, req.params.radius, req.params.budget, results => {
    maximizeBudget(results, req.params.budget)
    .then(results => res.status(300).send(results));
  });
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));



function maximizeBudget(results, budget) {
  return new Promise((resolve, reject) => {
    const maxValuesAtCapacities = [];
    for(let i = 0; i <= budget; i+=100) {
      maxValuesAtCapacities.push([0, []])
    };
    for (let currentCapacity = 0; currentCapacity <= budget; currentCapacity+=100) {
      let currentMaxValue = [0,[]];
      for (let j = 0; j < results.length; j++) {
        const team = results[j];
        if (team.price <= currentCapacity) {
          var maxValueUsingTeam = [0, []];
          if(maxValuesAtCapacities[(currentCapacity - parseInt(team.price))/100][1] && maxValuesAtCapacities[(currentCapacity - parseInt(team.price))/100][1].indexOf(team.name) === -1 ) {
            maxValueUsingTeam[0] = parseInt(team.price)
              + parseInt(maxValuesAtCapacities[(currentCapacity - team.price)/100][0])
            maxValueUsingTeam[1] = maxValuesAtCapacities[(currentCapacity - parseInt(team.price))/100][1].concat(team.name);
          } else {
            maxValueUsingTeam[0] = parseInt(team.price)
            maxValueUsingTeam[1] = [team.name];
          }
          if(currentMaxValue[0] > maxValueUsingTeam[0]) {
            currentMaxValue = currentMaxValue;
          } else if(currentMaxValue[0] === maxValueUsingTeam[0]) {
            currentMaxValue = currentMaxValue[1].length > maxValueUsingTeam[1].length ? currentMaxValue : maxValueUsingTeam;
          } else {
            currentMaxValue = maxValueUsingTeam;
          }
        }
      }
      maxValuesAtCapacities[currentCapacity/100] = currentMaxValue;
    }
    resolve(maxValuesAtCapacities[budget/100][1]);
  })
}



//==================================================================================
//DATABASE HELPERS
//Typically these would be seperated out into a different file



const mysql = require('mysql');
if(!process.env.JAWSDB_URL) require('./env.js');
const connection = mysql.createConnection(process.env.JAWSDB_URL);
connection.connect(function(err) {
  if (err) throw err;
  console.log('connected to database');
});

// See "Equirectangular approximation" (better performance for small distances)
// http://www.movable-type.co.uk/scripts/latlong.html
function findPossibilities(lat, lon, radius, budget, cb) {
  connection.query(
  `SELECT id, name, price,
  ( 3959 *
    SQRT(
      (RADIANS(longitude) - RADIANS(${lon})) * COS((RADIANS(${lat}) + RADIANS(latitude))/2)
      *
      (RADIANS(longitude) - RADIANS(${lon})) * COS((RADIANS(${lat}) + RADIANS(latitude))/2)
      +
      (RADIANS(latitude) - RADIANS(${lat})) * (RADIANS(latitude) - RADIANS(${lat}))
    )
  ) AS distance FROM teams HAVING price <= ${budget} AND distance <= ${radius} ORDER BY distance;`,
  (error, results) => {
    if(error) {
      throw new Error(error);
    } else {
      cb(results);
    }
  })
}


