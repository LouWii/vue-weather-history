<template>
  <div class="key-init">
    <div class="description">
      <p>This app uses data from <a href="https://dev.meteostat.net" target="_blank">MeteoStat API</a>. We ask you to <a href="https://auth.meteostat.net/" target="_blank">get your own API key</a> (it's free and easy, and privacy friendly) and enter it here. It's the only way we can keep the app accessible to anybody, without being limited by the API quota (2000 requests per day). The API key will be cached in your browser LocalStorage, so you won't have to enter it again.</p>
    </div>
    <div class="field-container">
      <label for="api-key-field">MeteoStat API Key</label>
      <input type="text" id="api-key-field" v-model="apiKey"/>
      <button @click.prevent="onApiKeySave">Save</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'KeyInit',
  components: {},
  data: function() {
    return {
      apiKey: '',
    }
  },
  methods: {
    ...mapActions(['saveApiKey']),
    onApiKeySave: function() {
      this.saveApiKey(this.apiKey)
    }
  }
}
</script>