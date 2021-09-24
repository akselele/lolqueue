<template>
  <v-container>
    <h1>games</h1>
    <game-card />
  </v-container>
</template>

<script>
import GameCard from '../../components/GameCard.vue'
// import { getMatchHistory } from '~/services/historyService'

export default {
  components: { GameCard },
  props: {
    GameCard,
  },
  // async asyncData(context) {
  //   const igns = context.store.state.names.igns
  //   const ign = context.params.history
  //   const containsIgn = igns.includes(ign)
  //   if (containsIgn) {
  //     const data = await getMatchHistory(context, ign)
  //     return { data }
  //   } else {
  //     context.redirect('/')
  //   }
  // },
  // async asyncData(context) {
  //   const matches = await getMatchHistory(context)
  //   return { matches }
  // },
}
</script>