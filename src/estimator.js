const covid19ImpactEstimator = (data) => {
  // Normalise the time in days, weeks and months
  // eslint-disable-next-line no-shadow
  const normalisedPeriod = (data) => {
    const period = data.periodType;
    const timeElapsed = data.timeToElapse;
    const elapsedTime = timeElapsed.toString().toLowerCase();
    switch (period) {
      case 'days':
        return elapsedTime;
      case 'weeks':
        return elapsedTime * 7;
      case 'months':
        return elapsedTime * 30;
      default:
        break;
    }
    return data;
  };
  // Challenge One:
  const input = data;
  const period = normalisedPeriod(input);
  const infectedOne = input.reportedCases * 10;
  const infectedTwo = input.reportedCases * 50;
  const infectedBytimeOne = infectedOne * (2 ** Math.trunc(period / 3));
  const infectedBytimeTwo = infectedTwo * (2 ** Math.trunc(period / 3));

  // Challenge Two:
  const severeInfectionsBytimeOne = 0.15 * infectedBytimeOne;
  const severeInfectionsBytimeTwo = 0.15 * infectedBytimeTwo;
  const availableBedsOne = Math.trunc((input.totalHospitalBeds * 0.35) - severeInfectionsBytimeOne);
  const availableBedsTwo = Math.trunc((input.totalHospitalBeds * 0.35) - severeInfectionsBytimeTwo);

  // Challenge Three:
  // impact on ICUs
  const requireICUone = Math.trunc(0.05 * infectedBytimeOne);
  const requireICUtwo = Math.trunc(0.05 * infectedBytimeTwo);
  // Impact on Ventilators
  const requireVentilatorOne = Math.trunc(infectedBytimeOne * 0.02);
  const requireVentilatorTwo = Math.trunc(infectedBytimeTwo * 0.02);
  // eslint-disable-next-line max-len
  const dollarsLostOne = (infectedBytimeOne * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD * period);
  // eslint-disable-next-line max-len
  const dollarsLostTwo = (infectedBytimeTwo * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD * period);

  const impact = {
    currentlyInfected: infectedOne,
    infectionsByRequestedTime: infectedBytimeOne,
    severeCasesByRequestedTime: severeInfectionsBytimeOne,
    hospitalBedsByRequestedTime: availableBedsOne,
    casesForICUByRequestedTime: requireICUone,
    casesForVentilatorsByRequestedTime: requireVentilatorOne,
    dollarsInFlight: dollarsLostOne
  };
  const severeImpact = {
    currentlyInfected: infectedTwo,
    infectionsByRequestedTime: infectedBytimeTwo,
    severeCasesByRequestedTime: severeInfectionsBytimeTwo,
    hospitalBedsByRequestedTime: availableBedsTwo,
    casesForICUByRequestedTime: requireICUtwo,
    casesForVentilatorsByRequestedTime: requireVentilatorTwo,
    dollarsInFlight: dollarsLostTwo
  };
  return {
    data: input,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
