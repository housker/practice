const maximizeBudget = require('./practice').maximizeBudget;
const oldMaximizeBudget = require('./practice').oldMaximizeBudget;
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const should = chai.should();

let sampleInput =
{ radius: '50',
  lat: '39.79802222881812',
  lon: '-104.89291278069777',
  budget: '8500' }

let sample1 =
[ {
    id: 1,
    name: 'The Wyld Stallions',
    price: 4500,
    distance: 5.123198343241792 },
  {
    id: 5,
    name: 'The Duloc Ogres',
    price: 2500,
    distance: 6.00684038554556 },
  {
    id: 3,
    name: 'The Zoomers',
    price: 1500,
    distance: 11.598226521006879 },
  {
    id: 2,
    name: 'Team Zoidberg',
    price: 6000,
    distance: 15.69664493395299 },
  {
    id: 4,
    name: 'North Horseburg Little League',
    price: 3500,
    distance: 28.846254017601403 } ];

let sample2 =
[ {
    id: 1,
    name: 'Numero Uno',
    price: 100,
    distance: 5.123198343241792 },
  {
    id: 1,
    name: 'Knights of the Round Table',
    price: 200,
    distance: 5.123198343241792 },

  {
    id: 1,
    name: 'The Oscars',
    price: 300,
    distance: 5.123198343241792 },
  {
    id: 1,
    name: 'The Wyld Stallions',
    price: 4500,
    distance: 5.123198343241792 },
  {
    id: 5,
    name: 'The Duloc Ogres',
    price: 2500,
    distance: 6.00684038554556 },
  {
    id: 3,
    name: 'The Zoomers',
    price: 1500,
    distance: 11.598226521006879 },
  {
    id: 2,
    name: 'Team Zoidberg',
    price: 6000,
    distance: 15.69664493395299 },
  {
    id: 4,
    name: 'North Horseburg Little League',
    price: 3500,
    distance: 28.846254017601403 } ];

// maximizeBudget(sample1, sampleInput.budget).then(res => console.log('new: ', res))
// console.log('the max budget')
// console.log(maximizeBudget(sample1, sampleInput.budget))


describe('largest number of teams and highest expenditure without going over budget', function() {
  describe('miximizeBudget', function() {
    it('should return teams whose prices add up to budget', function() {
      return maximizeBudget(sample1, sampleInput).should.eventually.equal(['The Zoomers', 'The Duloc Ogres', 'The Wyld Stallions']);
    });
  });

});

// describe('maximizeBudget', function() {
//   describe('largest number of teams and highest expenditure without going over budget', function() {
//     it('should return teams whose prices add up to budget', function() {
//       assert.equal(maximizeBudget(sample1, sampleInput), ['The Zoomers', 'The Duloc Ogres', 'The Wyld Stallions']);
//     });
//   });
// });

// describe('maximizeBudget', function() {
//   describe('largest number of teams and highest expenditure without going over budget', function() {
//     it('should return many low-priced teams', function() {
//       assert.equal(maximizeBudget(sample2, sampleInput), ['The Zoomers', 'The Duloc Ogres', 'The Wyld Stallions']);
//     });
//   });
// });