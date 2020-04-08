import { input } from '../data';

const covid19ImpactEstimator = (data) => ({
  data: input,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: data.currentlyInfected * 1024
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: this.currentlyInfected * 1024
  }
});

export default covid19ImpactEstimator;
