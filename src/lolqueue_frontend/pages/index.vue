<template>
  <div class="w-screen h-screen flex flex-col bg-dark-base">
    <div class="flex flex-col m-auto md:flex-row gap-8">
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
    <!-- <button class="btn btn-primary" @click="refreshRanks">
          REFRESH ALL
    </button> -->
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
  methods: {
    async refreshRanks() {
      const igns = this.$store.state.names.igns
      const refreshedRanks = await getRankRefresh(this, igns)
      this.ranks = refreshedRanks
    },
  },
}
</script>