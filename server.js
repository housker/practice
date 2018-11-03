// https://en.wikipedia.org/wiki/Knapsack_problem
// https://docs.google.com/document/d/e/2PACX-1vQuzq3cnLcsOhIrnAUDBc_WkhvdQEh7rORF2VMos6LAMzPJcdcrBvGZyKnlDzY2Pl7C4P9rRCJab-rT/pub

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
  const ascending = results.sort((a, b) => a.price > b.price);
  let selections = [];
  let curr = budget;
  let i = 0;
  while(i < ascending.length && curr > 0) {
    if(ascending[i].price <= curr) {
      selections.push(ascending[i].name)
    }
    curr -= ascending[i].price;
    i++;
  }
  resolve(selections);
  })
}






//The correct way to do this would be to implement the 0-1 Knapsack problem
// https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/

//   function maximizeBudget(results, budget) {
//     console.log('maximizeBudget is being called')
//   const maxValuesAtCapacities = [];
//   for(let i = 0; i <= budget; i++) {
//     maxValuesAtCapacities.push([0, []])
//   };

//   console.log(maxValuesAtCapacities[8500])

//   for (let currentCapacity = 0; currentCapacity <= budget; currentCapacity++) {
//     let currentMaxValue = [[0,[]]];
//     for (let j = 0; j < results.length; j++) {
//       const team = results[j];

//       // console.log(chosen)
//       if (team.price <= currentCapacity) {
//         // console.log('team.name: ', team.name)

//         // var chosen = [team.name];

// if(!Array.isArray(maxValuesAtCapacities[currentCapacity - team.price][1])) {

//         var maxValueUsingTeam = [parseInt(team.price)
//           + parseInt(maxValuesAtCapacities[currentCapacity - team.price][0]),
//             [team.name]
//             ];

// }

// else {
//   // console.log(maxValuesAtCapacities[currentCapacity - team.price][1])

//     maxValueUsingTeam = [parseInt(team.price)
//       + parseInt(maxValuesAtCapacities[currentCapacity - team.price][0]),
//         maxValuesAtCapacities[currentCapacity - team.price][1].push(team.name)
//         ];

// }

//         // maxValueUsingTeam[1] = maxValueUsingTeam[1].concat([team.name]);
//         currentMaxValue = currentMaxValue[0] > maxValueUsingTeam[0] ? currentMaxValue : maxValueUsingTeam;
//       }
//     }
//     maxValuesAtCapacities[currentCapacity] = currentMaxValue;
//   }
//   return maxValuesAtCapacities[budget];
// }



// //spend as close to your budget
// //get the most responses

// //say budget is $8500,
// //can get three teams:
// //A) $1,500; $2,500; $3,500 = $7,500
// //B) $1,500; $2,500; $4,500 = $8,500
// //But choice B is preferred because closer to budget


// let sampleResults = [
//   { id: 5, name: ' North Horseburg Little League', price: 2500, distance: 0.35105171381722233 },
//   { id: 1, name: ' Team Zoidberg', price: 4500, distance: 4.214519308968676 },
//   { id: 3, name: ' The Zoomers', price: 1500, distance: 6.556981803330678 },
//   { id: 2, name: ' The Wyld Stallions', price: 6000, distance: 16.34835861208388 },
//   { id: 4, name: ' The Duloc Ogres', price: 3500, distance: 29.822494232806235 }
// ]

// console.log(maximizeBudget(sampleResults, 8500))



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
      console.log('callback')
      cb(results);
    }
  })
}


