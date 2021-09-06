require('dotenv').config();
const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const axiosLimit = rateLimit(axios.create(), { maxRequests: 230, perMilliseconds: 10000, maxRPS: 23 });
export default class historyProvider {
  // key = process.env.RIOT_KEY
  // user = process.env.IGN

  // Next 2 methods dont get used, just there to check for errors
  async getPuuid() {
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const { data } = await axiosLimit.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${process.env.IGN}`, { headers: config });
    return data.puuid;
  }

  async getRecentMatches(puuid) {
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const { data } = await axiosLimit.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`, { headers: config });
    return data;
  }

  async getMatchDetails(matchId) {
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const { data } = await axiosLimit.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`, { headers: config });
    return data;
  }
}
