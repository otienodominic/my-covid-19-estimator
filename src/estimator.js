const covid19ImpactEstimator = (data) => {
  // Normalise the time in days, weeks and months
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
  const severeInfectionsBytimeOne = 0.15 * infectedBytimeOne;
  const severeInfectionsBytimeTwo = 0.15 * infectedBytimeTwo;
  const availableBedsOne = input.totalHospitalBeds * 0.35 - severeInfectionsBytimeOne;
  const availableBedsTwo = input.totalHospitalBeds * 0.35 - severeInfectionsBytimeTwo;

  const impact = {
    currentlyInfected: infectedOne,
    infectionsByRequestedTime: infectedBytimeOne,
    severeCasesByRequestedTime: severeInfectionsBytimeOne,
    hospitalBedsByRequestedTime: availableBedsOne
  };
  const severeImpact = {
    currentlyInfected: infectedTwo,
    infectionsByRequestedTime: infectedBytimeTwo,
    severeCasesByRequestedTime: severeInfectionsBytimeTwo,
    hospitalBedsByRequestedTime: availableBedsTwo
  };
  return {
    data: input,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
