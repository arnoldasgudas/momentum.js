function MomentumStrategy(lastDayOfMonthValues){
	this.lastDayOfMonthValues = lastDayOfMonthValues;

	this.ratioForMonths = function(monthsShift){
		if (this.lastDayOfMonthValues.length === 0)
			return 0;

		return this.lastDayOfMonthValues[0].Adj_Close / 
			this.lastDayOfMonthValues[monthsShift].Adj_Close;
	};

	this.inertia = function(){
		return this.ratioForMonths(1) + 
			this.ratioForMonths(3) +
			this.ratioForMonths(6) +
			this.ratioForMonths(9) + 
			this.ratioForMonths(12);
	};
}

// MomentumStrategy.prototype.ratioForMonths = function(){
// 	return MomentumStrategy.prototype.lastDayOfMonthValues.length == 0;
// };

module.exports = MomentumStrategy;