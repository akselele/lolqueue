<template>
  <div class="flex flex-col">
    <div>
      <NuxtLink :to="`/history/${ign}`">
        <div style="width: 290px" class="flex p-5 bg-gray-900 rounded-xl">
          <img class="rounded-full w-20" :src="getIcon" alt="Summonner Icon" />
          <div class="flex flex-col my-auto ml-5 mr-1">
            <p class="font-bold text-dark-text">{{ ign }}</p>
            <p class="text-dark-text">
              {{ highElo.includes(tier) ? `${tier}` : `${tier} ${rank}` }}
            </p>
            <p class="text-dark-text">{{ elo }} LP</p>
          </div>
        </div>
      </NuxtLink>
    </div>
    <p class="mx-auto mt-3 font-bold">MAIN</p>
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