<template>
  <div class="flex flex-col w-max">
    <div class="pl-md-4">
      <button class="btn btn-primary">REFRESH ALL</button>
    </div>
    <div>
      <div class="divider"></div>
    </div>
    <v-row no-gutters>
      <v-col v-for="account in ranks" :key="account.IGN" cols="6" md="6" align-self="start" class="pa-md-4 w-max">
        <Name
          :key="account.IGN"
          :ign="account.IGN"
          :rank="account.rank"
          :tier="account.tier"
          :elo="account.elo"
        >
        </Name>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getRank } from '~/services/historyService'

export default {
  async asyncData(context) {
    const igns = context.store.state.names.igns;
    const ranks = await getRank(context, igns);
    return { ranks };
  },
  // computed: {
  //   dividerLength() {
  //     return {
  //       "width": 0
  //     };
  //   }
  // },
}
</script>