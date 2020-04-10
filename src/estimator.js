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
function getDays({ timeToElapse, periodType = 'days' }) {
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
  return days;
}

function getImpact({ region, ...input }, mult = 1) {
  const days = getDays(input);
  const factor = Math.floor(days / 3);

  const currentlyInfected = input.reportedCases * 10 * mult;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);

  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.ceil(input.totalHospitalBeds * 0.35)
    - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);

  const dollarsInFlight = Math.floor((infectionsByRequestedTime * region.avgDailyIncomeInUSD
    * region.avgDailyIncomePopulation) / days);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
}

const covid19ImpactEstimator = (data) => ({
  data,
  impact: getImpact(data),
  severeImpact: getImpact(data, 5)
});

export default covid19ImpactEstimator;
