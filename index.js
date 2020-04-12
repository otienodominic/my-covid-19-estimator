const express = require('express');
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

server.listen(PORT);
// eslint-disable-next-line no-console
console.debug(`Server listening on port ${PORT}`);

app.post('/api/v1/on-covid-19', (req, res) => {
  // Define the request values
  const {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;

  // eslint-disable-next-line no-undef
  data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
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
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  // Define the request values
  const {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;

  // eslint-disable-next-line no-undef
  data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
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
});
app.post('/api/v1/on-covid-19/xml', (req, res) => {
  // Define the request values
  const {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;

  // eslint-disable-next-line no-undef
  data = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
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
});
