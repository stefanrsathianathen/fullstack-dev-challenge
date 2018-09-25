const cors = require('cors')
const express = require('express');
const app = express();
const controller = require('./controllers/interest');

app.use(cors());

//define route for receiving data from client
app.get('/:interestRateFreq/:initalAmount/:monthlyDeposit/:interestRate',function (req, res) {
  const info  = req.params;
  res.send(controller.calculate(
      parseFloat(info.interestRateFreq),
      parseFloat(info.initalAmount),
      parseFloat(info.monthlyDeposit),
      parseFloat(info.interestRate)
      ));
});




app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/build'));
}




app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
