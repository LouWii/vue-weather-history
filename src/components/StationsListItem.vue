<template>
  <div class="stations-list-item">
    <h4>
      <station-name :station="station" />
    </h4>
  </div>
</template>

<script>
import StationName from './StationName'

export default {
  name: 'StationsListItem',
  components: {StationName},
  props: {
    station: {
        required: true,
        type: Object
    }
  }
}
</script>