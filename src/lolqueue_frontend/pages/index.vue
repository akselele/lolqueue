<template>
  <div class="w-screen h-screen flex flex-col bg-dark-base">
    <div class="flex flex-col md:flex=row m-auto">
      <button
        class="btn btn-primary rounded-xl mb-8 md:mt-0 mt-4"
        :class="loading ? 'loading' : ''"
        @click="refreshRanks"
      >
        REFRESH RANKS
      </button>
      <!-- <div class="divider"></div> -->
      <div v-if="ranks && ranks.length <= 2">  
        <div class="flex flex-col md:flex-row gap-8">
          <template v-for="account in ranks">
            <Name
              :key="account.IGN"
              :ign="account.IGN"
              :rank="account.rank"
              :tier="account.tier"
              :elo="account.elo"
              :icon="account.icon"
              :challengerrank="account.challengerRank"
            />
          </template>
        </div>
      </div>
      <div v-else-if="ranks && ranks.length > 2" class="flex flex-col gap-4">
        <div
          v-for="(item, index) in ranksInTwoRows"
          :key="index"
          class="flex flex-col md:flex-row gap-8"
        >
          <template v-for="account in item">
            <Name
              :key="account.IGN"
              :ign="account.IGN"
              :rank="account.rank"
              :tier="account.tier"
              :elo="account.elo"
              :icon="account.icon"
              :challengerrank="account.challengerRank"
            />
          </template>
        </div>
      </div>
      <div v-else-if="ranks.length === 0">
        <p>There's been an error getting the data.</p>
        <p>Try refreshing the data.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getRank } from '~/services/historyService'

export default {
  async asyncData(context) {
    const igns = context.store.state.names.igns
    const ranks = await getRank(context, igns, true)
    return { ranks }
  },
  data() {
    return {
      loading: false,
    }
  },
  head: {
    title: 'Home - LoLQueue',
  },
  computed: {
    ranksInTwoRows() {
      const result = []
      for (let i = 0; i < this.ranks.length; i = i + 2) {
        const subArray = this.ranks.slice(i, i + 2)
        result.push(subArray)
      }
      return result
    },
  },
  methods: {
    async refreshRanks() {
      this.loading = true
      const igns = this.$store.state.names.igns
      const refreshedRanks = await getRank(this, igns, false)
      this.ranks = refreshedRanks
      this.loading = false
    },
  },
}
</script>