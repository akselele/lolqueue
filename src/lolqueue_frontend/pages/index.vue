<template>
  <div class="flex flex-col w-max">
    <div class="pl-md-4">
      <button class="btn btn-primary" @click="refreshRanks">REFRESH ALL</button>
    </div>
    <div>
      <div class="divider"></div>
    </div>
    <v-row>
      <v-col
        v-for="account in ranks"
        :key="account.IGN"
        cols="12"
        md="6"
        xs="2"
      >
        <Name
          :key="account.IGN"
          :ign="account.IGN"
          :rank="account.rank"
          :tier="account.tier"
          :elo="account.elo"
          :icon="account.icon"
          class="names"
        >
        </Name>
      </v-col>
    </v-row>
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
      const igns = this.$store.state.names.igns;
      const refreshedRanks = await getRankRefresh(this, igns);
      this.ranks = refreshedRanks;
    },
  },
}
</script>

<style scoped>
.names {
  min-width: 496.933px;
}

@media only screen and (max-width: 600px) {
  .names {
    min-width: 300px;
  }
}

@media only screen and (max-width: 1300px) {
  .names {
    min-width: 350px;
  }
}
</style>