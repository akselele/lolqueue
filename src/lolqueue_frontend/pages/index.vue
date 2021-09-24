<template>
<<<<<<< Updated upstream

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
=======
  <div class="flex flex-col w-max">
    <div class="pl-md-4">
      <button class="btn btn-primary">REFRESH ALL</button>
    </div>
    <div>
      <div class="divider"></div>
    </div>
    <v-row style="background-color: red; width: 50rem;">
      <v-col v-for="account in ranks" :key="account.IGN" cols="6">
        <Name
          :key="account.IGN"
          :ign="account.IGN"
          :rank="account.rank"
          :tier="account.tier"
          :elo="account.elo"
        >
        </Name>
>>>>>>> Stashed changes
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
