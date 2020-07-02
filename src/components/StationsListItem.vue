<template>
  <div class="stations-list-item">
    <h4>{{ station.name.en }}</h4>
  </div>
</template>

<script>
export default {
  name: 'StationsListItem',
  props: {
    station: {
        required: true,
        type: Object
    }
  }
}
</script>