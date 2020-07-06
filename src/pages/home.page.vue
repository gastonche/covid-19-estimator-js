<template>
  <main class="main-page" :class="{'no-result': !report}">
    <estimator-form :form-data="formData" @submit="estimate" class="form"></estimator-form>
    <transition name="results">
      <div class="results" v-if="report">
        <i class="close" @click="report=null">clear</i>
        <result :report="report.impact" :input="formData" class="impact" title="Estimated Impact" />
        <result :report="report.severeImpact" :input="formData" class="severe-impact" title="Estimated Severe Impact"  sub-title="According to Harvard Medical School / Massachusetts General Hospital" />
      </div>
    </transition>
  </main>
</template>
<script>
import EstimatorForm from '../components/form.component';
import result from '../components/results.component';
import estimate from '../estimator';

export default {
  components: { EstimatorForm, result },
  data() {
    return {
      formData: {
        region: {
          name: 'Africa',
          avgAge: 19.7,
          avgDailyIncomeInUSD: 5,
          avgDailyIncomePopulation: 0.71
        },
        periodType: 'days',
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
      },
      report: null
    };
  },
  methods: {
    estimate(data) {
      this.formData = {...data};
      this.report = estimate(data);
    }
  }
};
</script>
<style scoped>
.main-page {
  box-shadow: 0 0 5px 3px rgba(255, 255, 255, 0.1);
  max-height: calc(100vh - 40px);
  position: absolute;
  width: calc(100vw - 20px);
  max-width: 800px;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
  transition: max-height 0.3s ease-out;
  background: linear-gradient(45deg, #27c3f5, #27c3f5 20%, #292541 20%, #292541 85%, #27c3f5 85%)
}

.main-page.no-result{
  max-height: 600px;
}

.form, .results{
  max-width: 500px;
  margin: auto;
}

.results{
  padding: 20px 0;
}

i{
  float: right;
  cursor: pointer;
  padding: 5px;
  background: #166883;
  color: #fff;
  font-size: 12px;
}
</style>
