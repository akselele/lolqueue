<template>
  <div>
    <div v-for="game in data.filteredMatches" :key="game.metadata.matchId">
      <GameCard :match="game"> </GameCard>
    </div>
  </div>
</template>

<script>
import GameCard from '../../components/GameCard.vue'
import { getMatchHistory } from '~/services/historyService'

export default {
  components: { GameCard },
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