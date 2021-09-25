<template>
  <div class="w-screen h-screen flex flex-col bg-dark-base">
    <div class="flex flex-col md:flex=row m-auto">
      <button class="btn btn-primary mb-8 md:mt-0 mt-4" @click="refreshRanks">
        REFRESH ALL
      </button>
      <div v-if="ranks.length <= 2">
        <div class="flex flex-col md:flex-row gap-8">
          <template v-for="account in ranks">
            <Name
              :key="account.IGN"
              :ign="account.IGN"
              :rank="account.rank"
              :tier="account.tier"
              :elo="account.elo"
              :icon="account.icon"
            />
          </template>
        </div>
      </div>
      <div v-else class="flex flex-col gap-4">
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
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankCached, getRankRefresh } from '~/services/historyService'

export default {
  async asyncData(context) {
    const igns = context.store.state.names.igns
    const ranks = await getRankCached(context, igns)
    return { ranks }
  },
  computed: {
    ranksInTwoRows() {
      const result = []
      for (let i = 0; i < this.ranks.length; i = i + 2) {
        const subArray = this.ranks.slice(i, i + 2);
        result.push(subArray);
      }
      return result
    },
  },
  methods: {
    async refreshRanks() {
      const igns = this.$store.state.names.igns
      const refreshedRanks = await getRankRefresh(this, igns)
      this.ranks = refreshedRanks
    },
  },
}
</script>