// to generate single 10M record txt file that can be LOAD DATA LOCAL INFILE to AWS RDS:
// const faker = require('faker');
// const fs = require('fs');
// let stream = fs.createWriteStream('mock.txt', {flags:'a'});
//   // for(let i = 1; i < 3333333; i++) {
//   // for(let i = 3333333; i < 6666666; i++) {
//   for(let i = 6666666; i < 10000001; i++) {
//   num1 = 20 + Math.floor(Math.random() * 30) + Math.random();
//   num2 = 60 + Math.floor(Math.random() * 70) + Math.random();
//   //U.S. latitudes and longitudes (20-50 deg lat, negative 60-130 deg lon)
//   let latitude = Math.round(num1 * 100) / 100;
//   let longitude = - Math.round(num2 * 100) / 100;
//   let name = faker.random.words().replace(/\b(\w)/g, char => char.toUpperCase());
//   let line = `${i},${name},${(1 + (Math.floor(Math.random() * 100))) * 100},${latitude},${longitude}\n`;
//   stream.write(line);
//   if(!(i % 100000)) {
//     console.log(i/10000001);
//   }
// }
// stream.end();



const faker = require('faker');
const fs = require('fs');
const mysql = require('mysql');
if(!process.env.JAWSDB_URL) require('./env.js');
const connection = mysql.createConnection(process.env.JAWSDB_URL);
connection.connect(function(err) {
  if (err) throw err;
  writeFile(sets[0].file, sets[0].min, sets[0].max, () =>  connection.end());
});

let sets = [
  {
    file: 'mock1.txt',
    min: 1,
    max: 2000000
  },
  {
    file: 'mock2.txt',
    min: 2000000,
    max: 4000000
  },
  {
    file: 'mock3.txt',
    min: 4000000,
    max: 6000000
  },
  {
    file: 'mock4.txt',
    min: 6000000,
    max: 8000000
  },
  {
    file: 'mock5.txt',
    min: 8000000,
    max: 10000001
  }
];

function writeFile(fileName, min, max, cb) {
  let values = [];
  for(let i = min; i < max; i++) {
    num1 = 20 + Math.floor(Math.random() * 30) + Math.random();
    num2 = 60 + Math.floor(Math.random() * 70) + Math.random();
    //U.S. latitudes and longitudes (20-50 deg lat, negative 60-130 deg lon)
    let latitude = Math.round(num1 * 100) / 100;
    let longitude = - Math.round(num2 * 100) / 100;
    let name = faker.random.words().replace(/\b(\w)/g, char => char.toUpperCase());
    let price = (1 + (Math.floor(Math.random() * 100))) * 100;
    let entry = [name, price, latitude, longitude];
    values.push(entry);
    if(!(i % 1000) || i === max) {
      var sql = "INSERT INTO teams (name, price, latitude, longitude) VALUES ?";
      connection.query(sql, [values], function(err) {
        if (err) throw err;
      });
      values = [];
      console.log(i/10000001);
    }
  }
  cb();
}
//make sure to add ,\N to the end of the first line prior to running LOAD DATA LOCAL INFILE