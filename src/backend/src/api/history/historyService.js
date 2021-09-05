require('dotenv').config();
const axios = require('axios');

export default class historyService {
  // key = process.env.RIOT_KEY
  // user = process.env.IGN

  async getPuuid() {
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const response = axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${process.env.IGN}`, { headers: config });
    return response;
  }

  async getRecentMatches(puuid) {
    puuid = '0Pn2UI6PtopOGPAN8KMpWBcB2HSs52DbPYR7405AKVA-KTVuGlIPZKy4xnnB5tvBNcyUvfTrFaJ07w';
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const response = axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`, { headers: config });
    return response;
  }

  async getMatchDetails() {
    const matchId = 'EUW1_5446567910';
    const config = { 'X-Riot-Token': process.env.RIOT_KEY };
    const response = axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`, { headers: config });
    return response;
  }
}
