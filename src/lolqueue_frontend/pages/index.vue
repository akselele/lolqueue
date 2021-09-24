<template>

  <v-container>
    <v-row>
          <v-col v-for="account in ranks" :key="account.IGN">
      <Name
        :key="account.IGN"
        :ign="account.IGN"
        :rank="account.rank"
        :elo="account.elo"
      >
      </Name>
      </v-col>
    </v-row>

    
  </v-container>

</template>

<script>
import { getRank } from '~/services/historyService'

export default {
  async asyncData(context) {
    const igns = context.store.state.names.igns;
    const ranks = await getRank(context, igns)
    return { ranks }
  },
}
</script>

<style scoped>
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
