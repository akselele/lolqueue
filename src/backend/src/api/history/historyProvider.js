require('dotenv').config();
const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const axiosLimit = rateLimit(axios.create(), { maxRequests: 230, perMilliseconds: 10000, maxRPS: 23 });
export default class historyProvider {
  // key = process.env.RIOT_KEY
  // user = process.env.IGN

  async getPuuid() {
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const response = await axiosLimit.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${process.env.IGN}`, { headers: config });
    return response;
  }

  async getRecentMatches(puuid) {
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const response = await axiosLimit.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`, { headers: config });
    return response;
  }

  async getMatchDetails(matchId) {
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const response = await axiosLimit.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`, { headers: config });
    return response;
  }

  async getRank(ign) {
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const info = await axiosLimit.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(ign)}`, { headers: config });
    const response = await axiosLimit.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${info.data.id}`, { headers: config });
    return response;
  }
}
