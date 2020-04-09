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
  const infectedOne = data.reportedCases * 10;
  const infectedTwo = data.reportedCases * 50;
  const infectedBytimeOne = infectedOne * 2 ** (period / 3);
  const infectedBytimeTwo = infectedTwo * 2 ** (period / 3);
  const impact = {
    currentlyInfected: infectedOne,
    infectionsByRequestedTime: infectedBytimeOne
  };
  const severeImpact = {
    currentlyInfected: infectedTwo,
    infectionsByRequestedTime: infectedBytimeTwo
  };
  return {
    data: input,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
