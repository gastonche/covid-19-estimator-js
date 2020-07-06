<template>
  <div class="result">
    <h4>{{title}}</h4>
    <p>{{subTitle}}</p>
    <div class="output">
      <div class="data">
        <label>Actually currently Infected</label>
        <p class="value">{{report.currentlyInfected}}</p>
      </div>
      <div class="data">
        <label>Estimated infections in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.infectionsByRequestedTime}}</p>
      </div>
      <div class="data">
        <label>Cases that might be hospitalised in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.severeCasesByRequestedTime}}</p>
      </div>
      <div class="data">
        <label>Number of hospital beds available in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.hospitalBedsByRequestedTime}}</p>
      </div>
      <div class="data">
        <label>Cases that might be in the ICU in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.casesForICUByRequestedTime}}</p>
      </div>
      <div class="data">
        <label>Cases that might be on ventilators in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.casesForVentilatorsByRequestedTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
    report: Object,
    input: Object
  }
}
</script>

<style scoped>
  h4, p{
    margin: 5px 0;
  }

  .result{
    margin-bottom: 20px;
  }

  p{
    font-size: 12px;
  }

  .data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .data label{
    font-size: 12px;
    font-weight: bold;
    opacity: .5;
    margin-right: 25px;
  }

</style>