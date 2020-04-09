const covid19ImpactEstimator = (data) => {
  // Normalise the time in days, weeks and months
  // eslint-disable-next-line no-shadow
  const normalisedPeriod = (data) => {
    const period = data.periodType;
    const elapsedTime = data.timeToElapse;
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
  const infectedBytimeOne = infectedOne * 2 ** (period / 3);
  const infectedBytimeTwo = infectedTwo * 2 ** (period / 3);

  // Challenge Two:
  const severeInfectionsBytimeOne = Math.round(0.15 * infectedBytimeOne);
  const severeInfectionsBytimeTwo = Math.round(0.15 * infectedBytimeTwo);
  const availableBedsOne = Math.round(
    input.totalHospitalBeds * 0.35 - severeInfectionsBytimeOne
  );
  const availableBedsTwo = Math.round(
    input.totalHospitalBeds * 0.35 - severeInfectionsBytimeTwo
  );

  // Challenge Three:
  const requireICUone = Math.round(0.05 * infectedBytimeOne);
  const requireICUtwo = Math.round(0.05 * infectedBytimeTwo);
  const requireVentilatorOne = Math.round(0.02 * infectedBytimeOne);
  const requireVentilatorTwo = Math.round(0.02 * infectedBytimeTwo);
  // eslint-disable-next-line max-len
  const dollarsLostOne = Math.round(infectedBytimeOne * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD * period);
  // eslint-disable-next-line max-len
  const dollarsLostTwo = Math.round(infectedBytimeTwo * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD * period);

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
