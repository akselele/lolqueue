<template>
  <div>{{ data }}</div>
</template>

<script>
import { getMatchHistory } from '~/services/historyService'

export default {
  props: {},
  async asyncData(context) {
    const igns = context.store.state.names.igns
    const ign = context.params.history
    const containsIgn = igns.includes(ign)
    if (containsIgn) {
      const data = await getMatchHistory(context, ign)
      return { data }
    } else {
      context.redirect('/')
    }
  },
  // async asyncData(context) {
  //   const matches = await getMatchHistory(context)
  //   return { matches }
  // },
}
</script>