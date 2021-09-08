<template>
  <div>
    <div v-for="account in ranks" :key="account.IGN">
      <Name
        v-if="!account.loading"
        :key="account.IGN"
        :ign="account.IGN"
        :rank="account.rank"
        :elo="account.elo"
      >
      </Name>
      <v-progress-circular
        v-else
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
      {{ accounts }}
    </div>
  </div>
</template>

<script>
import { getRank } from '~/services/historyService'

export default {
  async asyncData(context) {
    const igns = ['Undercover CameL', 'Drυtutt', 'efsgesgs']

    const ranks = {}
    for (let i = 0; i < igns.length; i++) {
      const rank = await getRank(context, { params: { ign: igns[i] } })
      if (rank.length > 0) {
        const r = {}
        r.IGN = igns[i]
        r.rank = rank[0].tier
        r.elo = rank[0].leaguePoints
        r.loading = false
        ranks.push(r)
      }
    }
    return { ranks }
  },
}
</script>
