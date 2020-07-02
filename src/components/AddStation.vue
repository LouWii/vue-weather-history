<template>
  <div v-if="showAddStation" class="add-station">
    <p v-if="0 === stations.length">Start by searching for a city.</p>
    <multiselect
      v-model="selectedStation"
      label="name"
      track-by="id"
      placeholder="Type to search (3 chars min)"
      open-direction="bottom"
      :customLabel="customStationLabel"
      :options="searchStationsOptions"
      :multiple="false"
      :searchable="true"
      :loading="isLoading"
      :internal-search="false"
      :clear-on-select="false"
      :close-on-select="true"
      :options-limit="300"
      :max-height="600"
      :show-no-results="true"
      @search-change="onAsyncSearch"/>
      <div v-if="selectedStation" class="city-details">
        <h3>Weather Station Details:</h3>
        <div>
          <ul>
            <li><label>Name</label> {{ selectedStation.name.en }}</li>
            <li><label>Country</label> {{countryName}}</li>
            <li><label>Region</label> {{ selectedStation.region }}</li>
            <li><label>Elevation</label> {{ selectedStation.elevation }} meters</li>
            <li><label>Timezone</label> {{ selectedStation.timezone }}</li>
            <li><label></label> </li>
            <li><label></label> </li>
            <li><label></label> </li>
            <li><label></label> </li>
            <li><label></label> </li>
            <li><label></label> </li>
          </ul>
        </div>
        <div class="action">
          <button @click.prevent="onAddStation">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { isoCountry } from 'iso-country'

export default {
  name: 'AddStation',
  components: {},
  data() {
    return {
      isLoading: false,
      searchTimer: null,
      selectedStation: null,
    }
  },
  computed: {
    ...mapState(['apiKey', 'searchStationsOptions', 'showAddStationPane', 'stations']),
    countryName: function() {
      return this.getCountryName(this.selectedStation.country)
    },
    showAddStation: function() {
      return this.apiKey && (0 === this.stations.length || true === this.showAddStationPane)
    },
  },
  methods: {
    ...mapActions(['addStation', 'searchStations', 'triggerAddStationPane']),
    getCountryName(countryIsoCode) {
      const country = isoCountry(countryIsoCode)
      return country.name
    },
    customStationLabel: function(station) {
      return station.name.en + ' (' + this.getCountryName(station.country) + ')'
    },
    onAddStation() {
      this.addStation(this.selectedStation)
      if (this.stations.length) {
        this.triggerAddStationPane(false)
      }
    },
    onAsyncSearch(query) {
      if ('string' === typeof query && 2 < query.length) {
        clearTimeout(this.searchTimer)
        this.searchTimer = setTimeout(function(){
          this.searchStations(query)
        }.bind(this), 350)
      }
    }
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>