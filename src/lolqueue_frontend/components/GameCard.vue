<template>
  <div>{{ match.metadata.matchId}}</div>
</template>

<script>
export default {
  props: {
    match: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>


<style scoped>
</style>