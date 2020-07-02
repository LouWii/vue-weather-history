import Vue from 'vue'
import Vuex from 'vuex'
import {meteostatUrls, initMeteostatClient} from '../extra/meteostat'

Vue.use(Vuex)

const LOCAL_KEY_API_KEY = 'weather-app-name'
const LOCAL_KEY_STATIONS = 'weather-app-stations'

const MUT_ADD_SEARCH_STATIONS_OPTIONS = 'addSearchStationsOptions'
const MUT_ADD_STATION = 'addStation'
const MUT_RESET_SEARCH_STATIONS_OPTIONS = 'resetSearchStationsOptions'
const MUT_SAVE_API_KEY = 'saveApiKey'
const MUT_SHOW_ADD_STATION_PANE = 'triggerAddStationPane'

let meteostatClient = null

export default new Vuex.Store({
  state: {
    apiKey: null,
    searchStationsOptions: [],
    stations: [],
    showAddStationPane: false,
  },
  actions: {
    addStation({commit, state}, station) {
      const stationIdx = state.stations.find(s => s.id === station.id)
      if ('undefined' === typeof stationIdx) {
        commit(MUT_ADD_STATION, station)
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
    [MUT_RESET_SEARCH_STATIONS_OPTIONS](state) {
      state.searchStationsOptions = []
    },
    [MUT_SAVE_API_KEY](state, apiKey) {
      state.apiKey = apiKey
      localStorage.setItem(LOCAL_KEY_API_KEY, apiKey)
      meteostatClient = initMeteostatClient(apiKey)
    },
    [MUT_SHOW_ADD_STATION_PANE](state, show) {
      state.showAddStationPane = show
    }
  },
  modules: {
  }
})
