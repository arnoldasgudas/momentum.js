var chai = require('chai');
var expect = chai.expect;
var MomentumStrategy = require('./../momentum-stragegy.js');

describe('MomentumStrategy', function (){
	it('ratioForMonths() returns 0 when qoute data is empty', function () {
		var momentumStrategy = new MomentumStrategy([]);
		expect(momentumStrategy.ratioForMonths(1)).to.equal(0);
	});

	it('ratioForMonths(1) returns 1.2 when adjust close price of last month is 150 and adjust close price of previous month is 125', function(){
		var momentumStrategy = new MomentumStrategy([ 
			{ Symbol: 'GLD', Date: '2016-02-29', Adj_Close: '150.0' },
			{ Symbol: 'GLD', Date: '2016-01-31', Adj_Close: '125.0' }]);
		expect(momentumStrategy.ratioForMonths(1)).to.equal(1.2);
	});

	it('ratioForMonths(3) returns 1.5 when adjust close price of last month is 150 and adjust close price of before 3 months is 100', function(){
		var momentumStrategy = new MomentumStrategy([ 
			{ Symbol: 'GLD',Date: '2016-02-29',Adj_Close: '150.0' },
			{ Symbol: 'GLD',Date: '2016-01-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-12-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' }]);
		expect(momentumStrategy.ratioForMonths(3)).to.equal(1.5);
	});

	it('ratioForMonths(6) returns 1.25 when adjust close price of last month is 150 and adjust close price of before 6 months is 120', function(){
		var momentumStrategy = new MomentumStrategy([ 
			{ Symbol: 'GLD',Date: '2016-02-29',Adj_Close: '150.0' },
			{ Symbol: 'GLD',Date: '2016-01-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-12-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '120.0' }]);
		expect(momentumStrategy.ratioForMonths(6)).to.equal(1.25);
	});

	it('ratioForMonths(9) returns 1 when adjust close price of last month is 150 and adjust close price of before 9 months is 150', function(){
		var momentumStrategy = new MomentumStrategy([ 
			{ Symbol: 'GLD',Date: '2016-02-29',Adj_Close: '150.0' },
			{ Symbol: 'GLD',Date: '2016-01-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-12-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '120.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '150.0' }]);
		expect(momentumStrategy.ratioForMonths(9)).to.equal(1);
	});

	it('ratioForMonths(12) returns 0.75 when adjust close price of last month is 150 and adjust close price of before 12 months is 12', function(){
		var momentumStrategy = new MomentumStrategy([ 
			{ Symbol: 'GLD',Date: '2016-02-29',Adj_Close: '150.0' },
			{ Symbol: 'GLD',Date: '2016-01-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-12-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '120.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '150.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '200.0' }]);
		expect(momentumStrategy.ratioForMonths(12)).to.equal(0.75);
	});

	it('inertia returns 5.7 for 1, 3, 6, 9 and 12 months ratios', function(){
		var momentumStrategy = new MomentumStrategy([ 
			{ Symbol: 'GLD',Date: '2016-02-29',Adj_Close: '150.0' },
			{ Symbol: 'GLD',Date: '2016-01-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-12-31',Adj_Close: '125.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '120.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '150.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '100.0' },
			{ Symbol: 'GLD',Date: '2015-11-30',Adj_Close: '200.0' }]);
		expect(momentumStrategy.inertia()).to.equal(5.7);
	});
});