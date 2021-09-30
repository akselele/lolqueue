<template>
  <div class="w-screen h-screen flex flex-col bg-dark-base">
    <div class="flex flex-col md:flex=row m-auto">
      <button
        class="btn btn-primary rounded-xl mb-8  mt-4"
        :class="loading ? 'loading' : ''"
        @click="refreshMatches"
      >
        REFRESH MATCHES
      </button>
      <div class="flex flex-row gap-4">
        <div class="flex flex-col gap-4">
          <template v-for="game in matches">
            <GameCard :key="game.metadata.matchId" :match="game" :ign="ign" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from '../../components/GameCard.vue'
import { getMatchHistory } from '~/services/historyService'

export default {
  components: { GameCard },
  async asyncData(context) {
    const igns = context.store.state.names.igns
    const ign = context.params.history
    const containsIgn = igns.includes(ign)
    if (containsIgn) {
      const matches = await getMatchHistory(context, ign, true)
      return { matches, ign }
    } else {
      context.redirect('/')
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async refreshMatches() {
      this.loading = true
      const refreshedMatches = await getMatchHistory(this, this.ign, false)
      this.matches = refreshedMatches
      this.loading = false
    },
  },
}
</script>