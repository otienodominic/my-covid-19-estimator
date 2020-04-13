const covid19ImpactEstimator = (data) => {
  const normalisedPeriod = (data) => {
    const duration = data.periodType.toString().toLowerCase();
    const time = data.timeToElapse;
    switch (duration) {
      case 'days':
        return time;
      case 'weeks':
        return time * 7;
      case 'months':
        return time * 30;
      default:
        break;
    }
    return data.timeToElapse;
  };

  // Challenge One:
  const input = data;
  const { avgDailyIncomePopulation } = input.region;
  const { avgDailyIncomeInUSD } = input.region;
  const period = normalisedPeriod(input);
  const infectedOne = input.reportedCases * 10;
  const infectedTwo = input.reportedCases * 50;
  const infectedBytimeOne = Math.trunc(infectedOne * 2 ** (period / 3));
  const infectedBytimeTwo = Math.trunc(infectedTwo * 2 ** (period / 3));

  // Challenge Two:
  const severeInfectionsBytimeOne = 0.15 * infectedBytimeOne;
  const severeInfectionsBytimeTwo = 0.15 * infectedBytimeTwo;
  const availableBedsOne = Math.trunc(
    input.totalHospitalBeds * 0.35 - severeInfectionsBytimeOne
  );
  const availableBedsTwo = Math.trunc(
    input.totalHospitalBeds * 0.35 - severeInfectionsBytimeTwo
  );

  // Challenge Three:
  // impact on ICUs in the hospitals
  const requireICUone = Math.trunc(0.05 * infectedBytimeOne);
  const requireICUtwo = Math.trunc(0.05 * infectedBytimeTwo);
  // Impact on Ventilators
  const requireVentilatorOne = Math.trunc(infectedBytimeOne * 0.02);
  const requireVentilatorTwo = Math.trunc(infectedBytimeTwo * 0.02);
  // Impact on the Economy
  // eslint-disable-next-line max-len
  const economyLossOne = Math.trunc(
    (infectedBytimeOne * avgDailyIncomePopulation * avgDailyIncomeInUSD) / period
  );
  const economyLossTwo = Math.trunc(
    (infectedBytimeTwo * avgDailyIncomePopulation * avgDailyIncomeInUSD) / period
  );

  const impact = {
    currentlyInfected: infectedOne,
    infectionsByRequestedTime: infectedBytimeOne,
    severeCasesByRequestedTime: severeInfectionsBytimeOne,
    hospitalBedsByRequestedTime: availableBedsOne,
    casesForICUByRequestedTime: requireICUone,
    casesForVentilatorsByRequestedTime: requireVentilatorOne,
    dollarsInFlight: economyLossOne
  };
  const severeImpact = {
    currentlyInfected: infectedTwo,
    infectionsByRequestedTime: infectedBytimeTwo,
    severeCasesByRequestedTime: severeInfectionsBytimeTwo,
    hospitalBedsByRequestedTime: availableBedsTwo,
    casesForICUByRequestedTime: requireICUtwo,
    casesForVentilatorsByRequestedTime: requireVentilatorTwo,
    dollarsInFlight: economyLossTwo
  };
  return {
    data,
    impact,
    severeImpact
  };
};
module.exports = covid19ImpactEstimator;
