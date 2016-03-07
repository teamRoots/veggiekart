var vegetableCalc = require('../client/vegetableCalc');
var chai = require('chai');
var expect = chai.expect;

events = [{
  date: "2016-06-04T05:00:00.000Z",
  event: {
    date: "2016-06-04T05:00:00.000Z",
    displayDate: "Jun 4, 2016",
    host: "Youth Farm Lyndale",
    location: "Target Field"
  },
  id: 0,
  salads: [{
    quantity: 48,
    salad: {
      _id: "56ccdd50d94b28e861171926",
      name: "La Jefa",
      ingredients: [
        {
          _id: "56ccdd50d94b28e86117192d",
          amount: 4.25,
          ingredient_name: 'corn',
          unit: 'lbs.'
        },
        {
          _id: "56ccdd50d94b28e86117192d",
          amount: 4.25,
          ingredient_name: 'corn',
          unit: 'lbs.'
        },
        {
          _id: "56ccdd50d94b28e86117192d",
          amount: 2.5,
          ingredient_name: 'green bell pepper',
          unit: 'lbs.'
        },
        {
          _id: "56ccdd50d94b28e86117192d",
          amount: 7,
          ingredient_name: 'red bell pepper',
          unit: 'lbs.'
        }
      ]
    }
  }]
}];

console.log('events is ', events);

describe('vCalc', function() {

  describe('return array', function() {
    it('should return an array when given an array of form events', function(){
      // assert.equal(5, math.plusOne(4));
      expect(vCalc(events)).to.be.a('array');
    });
  });

  // describe('time 10', function() {
  //   it('should return 70 when given 7', function(){
  //     assert.equal(70, math.timesTen(7));
  //   });
  // });

});
