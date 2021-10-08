<template>
  <div class="flex flex-row">
    <div class="flex p-5 bg-gray-900 rounded-xl" :style="{ width: '450 px' }">
      <div>
        <img class="w-20 h-20" :src="getChampIcon()" alt="Champion Played" />
      </div>
      <div class="flex flex-col my-auto ml-5 mr-1">
        <div>
          <p
            class="font-bold text-dark-text"
            :class="isVictory() ? 'text-green-500' : 'text-red-500'"
          >
            {{ isVictory() ? 'VICTORY' : 'DEFEAT' }}
            {{ gameDuration }}
          </p>
        </div>
        <div class="flex flex-row w-5 mt-2">
          <img
            :src="getSummonerSpell(playerData.summoner1Id)"
            class="w-5 h-5"
          />
          <img
            :src="getSummonerSpell(playerData.summoner2Id)"
            class="w-5 h-5"
          />
        </div>
        <div>
          <p class="text-dark-text mt-2">
            {{ playerData.kills }}/{{ playerData.deaths }}/{{
              playerData.assists
            }}
          </p>
        </div>
      </div>
      <div class="flex flex-col my-auto ml-5 gap-2">
        <div class="flex flex-row gap-2">
          <template v-for="item in playerData.items.slice(0, 3)">
            <img
              :key="item"
              class="w-10 h-10 ma-1"
              :src="getItemIcon(item)"
              alt="Item"
              :style="[item === 0 ? { display: 'none' } : {}]"
            />
          </template>
        </div>
        <div class="flex flex-row gap-2">
          <template v-for="item in playerData.items.slice(3, 6)">
            <img
              :key="item"
              class="w-10 h-10"
              :src="getItemIcon(item)"
              alt="Item"
              :style="[item === 0 ? { display: 'none' } : {}]"
            />
          </template>
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
  created() {
    const minutes = Math.floor(this.match.info.gameDuration / 60000)
    const seconds = ((this.match.info.gameDuration % 60000) / 1000).toFixed(0)
    this.gameDuration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    const items = []
    items.push(this.playerData.item0)
    items.push(this.playerData.item1)
    items.push(this.playerData.item2)
    items.push(this.playerData.item3)
    items.push(this.playerData.item4)
    items.push(this.playerData.item5)
    this.playerData.items = items
  },
  methods: {
    getSummonerSpell(id) {
      return `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${this.summonerSpells[id]}.png`
    },
    getChampIcon() {
      const champ = this.playerData.championName
      return `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${champ}.png`
    },
    isVictory() {
      return this.playerData.win
    },
    getItemIcon(id) {
      return `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${id}.png`
    },
  },
}
</script>


<style scoped>
</style>