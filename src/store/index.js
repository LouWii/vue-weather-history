import Vue from 'vue'
import Vuex from 'vuex'
import {meteostatUrls, initMeteostatClient} from '../extra/meteostat'
import {getStationColor} from '../extra/stationColor'

Vue.use(Vuex)

const LOCAL_KEY_API_KEY = 'weather-app-name'
const LOCAL_KEY_STATIONS = 'weather-app-stations'

const MUT_ADD_SEARCH_STATIONS_OPTIONS = 'addSearchStationsOptions'
const MUT_ADD_STATION = 'addStation'
const MUT_ADD_STATION_CLIMATE_NORMALS = 'addStationClimateNormals'
const MUT_DECREASE_DATA_FETCHING_COUNT = 'decreaseDataFetchingCount'
const MUT_INCREASE_DATA_FETCHING_COUNT = 'increaseDataFetchingCount'
const MUT_RESET_SEARCH_STATIONS_OPTIONS = 'resetSearchStationsOptions'
const MUT_SAVE_API_KEY = 'saveApiKey'
const MUT_SET_FOCUSED_STATION = 'setFocusedStation'
const MUT_SET_PRERIOD_TYPE = 'setPeriodType'
const MUT_SHOW_ADD_STATION_PANE = 'triggerAddStationPane'

let meteostatClient = null

export default new Vuex.Store({
  state: {
    apiKey: null,
    dataFetchingCount: 0,
    focusedStation: null,
    periodType: null,
    searchStationsOptions: [],
    showAddStationPane: false,
    stations: [],
    stationsClimateNormals: [],
  },
  getters: {
    getStation: state => stationId => state.stations.find(s => s.id === stationId),
    getStationByIndex: state => index => state.stations[index] ? state.stations[index] : null,
    getStationClimateNormals: state => stationId => state.stationsClimateNormals.find(scn => scn.stationId === stationId),
    getStationColor: (state, getters) => stationId => {
      const stationIndex = getters.getStationIndex(stationId)
      return getStationColor(stationIndex)
    },
    getStationIndex: state => stationId => state.stations.findIndex(s => s.id === stationId),
    isFetchingData: state => state.dataFetchingCount !== 0,
    isFocusedStation: state => stationId => stationId === state.focusedStation,
  },
  actions: {
    addStation({commit, state}, station) {
      const stationIdx = state.stations.find(s => s.id === station.id)
      if ('undefined' === typeof stationIdx) {
        commit(MUT_ADD_STATION, station)
      }
    },
    fetchAllClimateNormals({dispatch, state}) {
      let delay = 0
      state.stations.forEach(s => {
        dispatch('fetchStationClimateNormals', {
          stationId: s.id,
          delay})
        delay += 600;
      })
    },
    fetchStationClimateNormals({commit, state}, {stationId, delay}) {
      // Only fetch if not not present in state
      const stationClimateNormalsIdx = state.stationsClimateNormals.find(e => e.stationId === stationId)
      if ('undefined' === typeof stationClimateNormalsIdx) {
        commit(MUT_INCREASE_DATA_FETCHING_COUNT)
        setTimeout(function() {
          meteostatClient
            .get(meteostatUrls.climateNormals(), {params: {station: stationId}})
            .then(response => {
              if (response.data.meta) {
                response.data.stationId = stationId
                commit(MUT_ADD_STATION_CLIMATE_NORMALS, response.data)
              }
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => {
              commit(MUT_DECREASE_DATA_FETCHING_COUNT)
            })
        }, delay)
      }
    },
    resetSearchStationsOptions({commit}) {
      commit(MUT_RESET_SEARCH_STATIONS_OPTIONS)
    },
    saveApiKey({commit}, apiKey) {
      commit(MUT_SAVE_API_KEY, apiKey)
    },
    searchStations({commit}, query) {
      meteostatClient
        .get(meteostatUrls.stationSearch(), {params: {query}})
        .then(response => {
          console.log(response)
          if (Array.isArray(response.data.data) && response.data.data.length) {
            commit(MUT_ADD_SEARCH_STATIONS_OPTIONS, response.data.data)
          } else {
            commit(MUT_ADD_SEARCH_STATIONS_OPTIONS, [])
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    setFocusedStation({commit}, stationId) {
      commit(MUT_SET_FOCUSED_STATION, stationId)
    },
    setPeriodType({commit}, periodType) {
      commit(MUT_SET_PRERIOD_TYPE, periodType)
    },
    triggerAddStationPane({commit}, show) {
      commit(MUT_SHOW_ADD_STATION_PANE, show)
    },
  },
  mutations: {
    initializeFromLocalStorage(state) {
      if (localStorage.getItem(LOCAL_KEY_API_KEY)) {
        state.apiKey = localStorage.getItem(LOCAL_KEY_API_KEY)
        meteostatClient = initMeteostatClient(state.apiKey)
      }
      if (localStorage.getItem(LOCAL_KEY_STATIONS)) {
        try {
          const cachedStations = JSON.parse(localStorage.getItem(LOCAL_KEY_STATIONS))
          if (Array.isArray(cachedStations)) {
            state.stations = cachedStations
            // TODO: check all items in array to make sure they're the proper object type
          }
        } catch (error) {
          console.warn('Saved stations list is corrupted')
        }
      }
    },
    [MUT_ADD_SEARCH_STATIONS_OPTIONS](state, options) {
      // state.searchStationsOptions = []
      state.searchStationsOptions = options
    },
    [MUT_ADD_STATION](state, station) {
      state.stations.push(station)
      localStorage.setItem(LOCAL_KEY_STATIONS, JSON.stringify(state.stations))
    },
    [MUT_ADD_STATION_CLIMATE_NORMALS](state, payload) {
      state.stationsClimateNormals.push(payload)
    },
    [MUT_DECREASE_DATA_FETCHING_COUNT](state) {
      state.dataFetchingCount = state.dataFetchingCount - 1
    },
    [MUT_INCREASE_DATA_FETCHING_COUNT](state) {
      state.dataFetchingCount = state.dataFetchingCount + 1
    },
    [MUT_RESET_SEARCH_STATIONS_OPTIONS](state) {
      state.searchStationsOptions = []
    },
    [MUT_SAVE_API_KEY](state, apiKey) {
      state.apiKey = apiKey
      localStorage.setItem(LOCAL_KEY_API_KEY, apiKey)
      meteostatClient = initMeteostatClient(apiKey)
    },
    [MUT_SET_FOCUSED_STATION](state, stationId) {
      state.focusedStation = stationId
      // TODO: if used to unset the focused station (null value), should we check that the value hasn't been changed? Like if someone left and entered another station, we could end up with this function called in not the right order
    },
    [MUT_SET_PRERIOD_TYPE](state, periodType) {
      state.periodType = periodType
    },
    [MUT_SHOW_ADD_STATION_PANE](state, show) {
      state.showAddStationPane = show
    }
  },
  modules: {
  }
})
