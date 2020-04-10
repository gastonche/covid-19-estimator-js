<template>
  <form @submit.stop.prevent="submit">
    <h2>Covid 19 Estimator</h2>
    <p>Get a rough estimation of expected effects of covid-19 in your region</p>

    <div class="form-input">
      <label for="population">Estimated Current Population</label>
      <input
        type="number"
        min="0"
        class="input"
        id="population"
        data-population="data-population"
        v-model="data.population"
        required="true"
      />
    </div>

    <div class="form-input">
      <label for="totalHospitalBeds">Estimated Number of Hospital Beds</label>
      <input
        type="number"
        min="0"
        class="input"
        id="totalHospitalBeds"
        data-total-hospital-beds="data-total-hospital-beds"
        v-model="data.totalHospitalBeds"
        required="true"
      />
    </div>

    <div class="form-input">
      <label for="periodType">Estimation Period Type</label>
      <select
        name="periodType"
        class="input"
        v-model="data.periodType"
        data-period-type="data-period-type"
        required="true"
        id="periodType"
      >
        <option
          v-for="type in periodTypes"
          :key="type.value"
          :value="type.value"
          >{{ type.label }}</option
        >
      </select>
    </div>

    <div class="form-input">
      <label for="timeToElapse"
        >Number of {{ data.periodType }} to estimate for</label
      >
      <input
        type="number"
        min="0"
        class="input"
        data-time-to-elapse="data-time-to-elapse"
        id="timeToElapse"
        v-model="data.timeToElapse"
        required="true"
      />
    </div>

    <div class="form-input">
      <label for="reportedCases">Currently Reported Cases</label>
      <input
        type="number"
        min="0"
        class="input"
        data-reported-cases="data-reported-cases"
        v-model="data.reportedCases"
        required="true"
        id="reportedCases"
      />
    </div>
    <button class="submit" data-go-estimate="data-go-estimate">Calculate</button>
  </form>
</template>

<script>
export default {
  name: 'estimatorForm',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data: { ...this.formData },
      periodTypes: [
        {
          label: 'Days',
          value: 'days'
        },
        {
          label: 'Weeks',
          value: 'weeks'
        },
        {
          label: 'Months',
          value: 'months'
        }
      ]
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.data);
    }
  }
};
</script>

<style scoped>
  h2, p{
    text-align: center;
  }

  label{
    font-size: 12px;
    margin-bottom: 5px;
  }

  input, select{
    width: 100%;
    height: 35px;
    padding: 5px 10px;
    box-sizing: border-box;
    margin: 5px 0 10px 0;
    border-radius: 5px;
    border: 1px solid #eee;
    outline: none;
  }

  .submit{
    padding: 10px;
    background: #27c3f5;
    border-radius: 5px;
    margin: 10px auto;
    display: block;
    width: 300px;
    max-width: calc(100vw - 40px);
    color: #fff;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
    outline: none;
    cursor: pointer;
  }
</style>
