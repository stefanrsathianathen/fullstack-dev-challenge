//formula from:
// https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php?page=2
// return array of dicts for graph function
module.exports.calculate = function calculate(interestRateFreq,initalAmount,monthlyDeposit,interestRate){
  const MONTHS = 50*12;
  interestRate = interestRate/100;
  let i = 1;
  let datapoints = [{month: i,amount:initalAmount}];
  let savings = initalAmount;
  for(i; i <= MONTHS; i++){
    if (i%(12/interestRateFreq)==0){
      savings *= (1+interestRate/interestRateFreq);
    }
    savings += monthlyDeposit;

    datapoints.push({month: i+1,amount:savings});
  }
  return datapoints;
}