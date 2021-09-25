<template>
  <div>
    <NuxtLink :to="`/history/${ign}`">
      <v-card elevation="6" nuxt>
        <v-row align="start">
          <v-col class="shrink">
            <v-img
              height="100"
              width="100"
              :src="getIcon"
              class="rounded-circle mt-md-2 mb-md-2 ml-md-2"
            ></v-img>
          </v-col>
          <v-col>
            <v-card-title>
              {{ ign }}
            </v-card-title>
            <v-card-subtitle>
              {{ highElo.includes(tier) ? `${tier}` : `${tier} ${rank}` }} |
              {{ elo }} LP
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </NuxtLink>
  </div>
</template>
  
<script>
export default {
  props: {
    ign: {
      type: String,
      required: true,
      default: '',
    },
    rank: {
      type: String,
      required: true,
      default: '',
    },
    tier: {
      type: String,
      required: true,
      default: '',
    },
    elo: {
      type: Number,
      required: true,
      default: 0,
    },
    icon: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      highElo: ['CHALLENGER', 'MASTER', 'GRANDMASTER'],
    }
  },
  computed: {
    getIcon(icon) {
      return `https://ddragon.leagueoflegends.com/cdn/${this.$store.state.names.patch}/img/profileicon/${this.icon}.png`
    },
  },
}
</script>