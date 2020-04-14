const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const xml = require('object-to-xml');
const estimator = require('./src/estimator');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.txt'),
  { flags: 'a', encoding: 'utf8' }
);
// setup the logger

// Writing a function that can get time response
morgan.token('response', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  if (!res._header || !req._startAt) return '';
  // eslint-disable-next-line no-underscore-dangle
  const diff = process.hrtime(req._startAt);
  let ms = diff[0] * 1e3 + diff[1] * 1e-6;
  ms = ms.toFixed(0);
  return `${ms.toString().padStart(2, '0')}ms`;
});

app.use(
  morgan(':method :url :status :response\n', {
    stream: accessLogStream
  })
);

app.get('/api/v1/on-covid-19/logs', (req, res, next) => {
  const data = fs.readFileSync(path.join(__dirname, './access.txt'), { encoding: 'utf8' });
  res.format({
    // eslint-disable-next-line func-names
    'text/plain': function () {
      res.status(200).send(data);
    }
  });
  next();
});

/*
app.get('/api/v1/on-covid-19/logs', (req, res, next) => {
  const data = fs.readFile('./access.txt', 'utf8', (err, data) => {
    res.format({'text/plain': function () {
        res.send(data)
      }
  })
})

fs.readFile('./access.txt', 'utf8', (err, data) => {
  if (err) throw err;
  // line by line
  // eslint-disable-next-line no-undef
  res.format({
    // eslint-disable-next-line func-names
    'text/plain': function () {
      // eslint-disable-next-line no-undef
      res.status(200).send(data);
    }
  });
});
*/
// server to listen to the port
server.listen(PORT);
// eslint-disable-next-line no-console
console.debug(`Server listening on port ${PORT}`);

// Endpoint to the default request
app.post('/api/v1/on-covid-19', (req, res, next) => {
  // Define the request values
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  // eslint-disable-next-line no-undef
  data = {
    region: {
      name: region.name,
      avgAge: region.avgAge,
      avgDailyIncomeInUSD: region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: region.avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
  // Estimate using the estimator function
  // eslint-disable-next-line no-undef
  const doer = estimator(data);
  res.send(doer);

  next();
});

app.post('/api/v1/on-covid-19/json', (req, res, next) => {
  // Define the request values
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  // eslint-disable-next-line no-undef
  data = {
    region: {
      name: region.name,
      avgAge: region.avgAge,
      avgDailyIncomeInUSD: region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: region.avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
  // Estimate using the estimator function
  // eslint-disable-next-line no-undef
  const doer = estimator(data);
  res.json(doer);
  next();
});
// Endpoint to the xml response
app.post('/api/v1/on-covid-19/xml', (req, res, next) => {
  // Define the request values
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  // eslint-disable-next-line no-undef
  data = {
    region: {
      name: region.name,
      avgAge: region.avgAge,
      avgDailyIncomeInUSD: region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: region.avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
  // Estimate using the estimator function
  // eslint-disable-next-line no-undef
  const doer = estimator(data);
  res.set('Content-Type', 'application/xml');
  res.send(xml(doer));
  next();
});
