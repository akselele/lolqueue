<template>
  <div class="flex flex-row">
    <div style="width: 290px" class="flex p-5 bg-gray-900 rounded-xl">
      <img class="w-20 h-20" :src="getChampIcon" alt="Champion Played" />
      <div class="flex flex-col my-auto ml-5 mr-1">
        <p
          class="font-bold text-dark-text"
          :class="isVictory ? 'text-green-500' : 'text-red-500'"
        >
          {{ isVictory ? 'VICTORY' : 'DEFEAT' }}
          {{ gameDuration }}
        </p>
        <div class="flex flex-col">
          <img :src="getSummonerSpell(playerData.summoner1Id)" class="w-5 h-5" />
          <img :src="getSummonerSpell(playerData.summoner2Id)" class="w-5 h-5" />
        </div>
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
  data() {
    return {
      playerData: this.match.info.participants.find(
        (e) => e.summonerName === this.ign
      ),
      gameDuration: '',
      summonerSpells: {
        21: 'SummonerBarrier',
        1: 'SummonerBoost',
        14: 'SummonerDot',
        3: 'SummonerExhaust',
        4: 'SummonerFlash',
        6: 'SummonerHaste',
        7: 'SummonerHeal',
        13: 'SummonerMana',
        11: 'SummonerSmite',
        12: 'SummonerTeleport',
      },
    }
  },
  computed: {
    getChampIcon() {
      const champ = this.playerData.championName
      return `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${champ}.png`
    },
    isVictory() {
      return this.playerData.win
    },
  },
  created() {
    const minutes = Math.floor(this.match.info.gameDuration / 60000)
    const seconds = ((this.match.info.gameDuration % 60000) / 1000).toFixed(0)
    this.gameDuration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  },
  methods: {
    getSummonerSpell(id) {
      return `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${this.summonerSpells[id]}.png`
    },
  },
}
</script>


<style scoped>
</style>