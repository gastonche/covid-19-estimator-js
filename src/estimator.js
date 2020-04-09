/**
*****************************************
*          Input Data format            *
*****************************************
    {
        region: {
            name: "Africa",
            avgAge: 19.7,
            avgDailyIncomeInUSD: 5,
            avgDailyIncomePopulation: 0.71
        },
        periodType: "days", // months, weeks
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
    }
*******************************************
*          OutOut Data format             *
*******************************************
    {
        data: {}, // the input data you got
        impact: {}, // your best case estimation
        severeImpact: {} // your severe case estimation
    }
*/
function getFactor({ timeToElapse, periodType = 'days' }) {
  let days;
  switch (periodType) {
    case 'weeks':
      days = timeToElapse * 7;
      break;
    case 'months':
      days = timeToElapse * 30;
      break;
    default:
      days = timeToElapse;
      break;
  }

  return Math.floor(days / 3);
}

function getImpact(input) {
  const factor = getFactor(input);
  const currentlyInfected = input.reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.ceil(input.totalHospitalBeds * 0.35)
    - severeCasesByRequestedTime;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
}

function getSevereImpact(impact, input) {
  const severeCasesByRequestedTime = impact.severeCasesByRequestedTime * 5;
  const hospitalBedsByRequestedTime = Math.ceil(input.totalHospitalBeds * 0.35)
    - severeCasesByRequestedTime;

  return {
    currentlyInfected: impact.currentlyInfected * 5,
    infectionsByRequestedTime: impact.infectionsByRequestedTime * 5,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
}

const covid19ImpactEstimator = (data) => {
  const impact = getImpact(data);
  const severeImpact = getSevereImpact(impact, data);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
