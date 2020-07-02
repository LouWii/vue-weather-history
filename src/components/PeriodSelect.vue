<template>
  <div class="period-select">
    <div class="selector-container">
      <select v-model="periodType">
        <option value="climate-normals">Climate Normals</option>
        <option value="yearly">Yearly</option>
        <option value="custom">Custom Dates</option>
      </select>
      <div v-if="displayYearly" class="extra-yearly">
        <select v-model="yearlyYear">
          <option v-for="y in yearlyYears" :key="y">{{ y }}</option>
        </select>
      </div>
    </div>
    <div class="extra-info">
      <p v-if="periodType === 'climate-normals'">Climate Normals are long-term averages of historical weather observations, they represent the typical monthly weather.</p>
      <p v-if="displayYearly">Select a specific year to aggregate data from. Note that it's highly possible that data will be missing for {{currentYear}} as it's not added in real time.</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'PeriodSelect',
  data: function() {
    return {
      periodType: null,
      yearlyYear: null,
    }
  },
  computed: {
    currentYear: () => new Date().getFullYear(),
    displayYearly: function() {
      return this.periodType === 'yearly'
    },
    yearlyYears: () => {
      const currentYear = parseInt(new Date().getFullYear(), 10)
      const years = []
      for (let y = currentYear - 30; y <= currentYear; y++) {
        years.push(y)
      }
      return years.reverse()
    }
  },
  methods: {
    ...mapActions(['setPeriodType']),
  },
  watch: {
    periodType: function() {
      this.setPeriodType(this.periodType)
    }
  }
}
</script>