<template>
  <div class="flex flex-row">
    <div style="width: 290px" class="flex p-5 bg-gray-900 rounded-xl">
      <img class="w-20" :src="getChampIcon" alt="Champion Played" />
      <div class="flex flex-col my-auto ml-5 mr-1">
        <p class="font-bold text-dark-text" :class="isVictory ? 'text-green-500' : 'text-red-500'">
          {{ isVictory ? 'VICTORY' : 'DEFEAT' }}
        </p>
      </div>
    </div>
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
    match: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    getChampIcon() {
      const champ = this.match.info.participants.find(
        (e) => e.summonerName === this.ign
      ).championName
      return `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${champ}.png`
    },
    isVictory() {
      return this.match.info.participants.find(
        (e) => e.summonerName === this.ign
      ).win
    },
  },
}
</script>


<style scoped>
</style>