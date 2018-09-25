var cors = require('cors')
const express = require('express');

const app = express();

app.use(cors());


app.get('/:interestRateFreq/:initalAmount/:monthlyDeposit/:interestRate',function (req, res) {
  const info  = req.params;
  res.send(calculate(
      parseFloat(info.interestRateFreq),
      parseFloat(info.initalAmount),
      parseFloat(info.monthlyDeposit),
      parseFloat(info.interestRate)
      ));
});
// https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php?page=2
function calculate(interestRateFreq,initalAmount,monthlyDeposit,interestRate){
  const MONTHS = 50*12;
  interestRate = interestRate/100;
  let i = 1;
  let datapoints = [{month: i,amount:initalAmount}];
  for(i; i <= MONTHS; i++){
    let powerPart = Math.pow((1+(interestRate/interestRateFreq)),(interestRateFreq*(i/12)));
    compoundInterestPrincipal = initalAmount*powerPart;
    futureValueSeries = monthlyDeposit * ((powerPart-1)/ (interestRate/interestRateFreq));

    datapoints.push({month: i+1,amount:compoundInterestPrincipal+futureValueSeries});
  }
  return datapoints;
}

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/build'));
}




app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
