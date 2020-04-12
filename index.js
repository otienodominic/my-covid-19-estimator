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
  { flags: 'a' }
);
// setup the logger
app.use(
  morgan(':method :url :status :total-time ms', { stream: accessLogStream })
);

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, './access.txt'));
  res.status(200).send(data);
});
// server to listen to the port
server.listen(PORT);
// eslint-disable-next-line no-console
console.debug(`Server listening on port ${PORT}`);

// Endpoint to the default request
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
// Endpoint to the xml response
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
