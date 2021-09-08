<template>
  <div>{{ matches }}</div>
</template>

<script>
import { getMatchHistory } from '~/services/historyService'

export default {
  async asyncData(context) {
    const matches = await getMatchHistory(context)
    return { matches }
  },
}
</script>

<style scoped>
</style>