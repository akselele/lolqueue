<template>
  <div class="flex flex-col w-max">
    <div class="pl-md-4">
      <button class="btn btn-primary">REFRESH ALL</button>
    </div>
    <div>
      <div class="divider"></div>
    </div>
    <v-row class="names">
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
    const igns = context.store.state.names.igns
    const ranks = await getRank(context, igns)
    return { ranks }
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

<style scoped>
.names{
  min-width: 496.933px
}

@media only screen and (max-width: 600px) {
  .names {
    min-width: 300px;
  }
}
</style>