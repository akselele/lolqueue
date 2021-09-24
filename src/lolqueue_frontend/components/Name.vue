<template>
  <div>
    <NuxtLink :to="`/history/${ign}`">
      <v-card elevation="6" nuxt>
        <v-card-title>
          {{ ign }}
        </v-card-title>
        <v-card-subtitle>
          {{ highElo.includes(tier) ? `${tier}` : `${tier} ${rank}` }} |
          {{ elo }} LP
        </v-card-subtitle>
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
  },
  data() {
    return {
      highElo: ['CHALLENGER', 'MASTER', 'GRANDMASTER'],
    }
  },
}
</script>