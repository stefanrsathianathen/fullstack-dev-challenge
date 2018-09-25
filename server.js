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
  let savings = initalAmount;
  for(i; i <= MONTHS; i++){
    if (i%(12/interestRateFreq)==0){
      savings *= (1+interestRate/interestRateFreq);
    }
    savings += 100;

    datapoints.push({month: i+1,amount:savings});
  }
  return datapoints;
}



// Compound interest for principal:

// P(1+r/n)(nt)

// Future value of a series:

// PMT × {[(1 + r/n)(nt) - 1] / (r/n)}


// function calculate(n, p, PMT, r){

//   const N_MONTHS = 50*12;  // calculate amounts for each month for 5 years
//   console.log(r);
//   r /= 100.0;   // convert r from % to decimal

//   let i = 1;
//   let datapoints = [{month: i, amount: p}];

//   for (i; i <= N_MONTHS; i++){

//     let factor = 1 + r/n;
//     factor = Math.pow(factor, n * i);
//     let compountInterest = p * bracketsPartWithPow;
//     let futureValue = PMT * ((bracketsPartWithPow - 1)/ (r/n));

//     // {[(1 + r/n)(nt) - 1] / (r/n)}
//   }

//   return datapoints;
// }



// }

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/build'));
}




app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
