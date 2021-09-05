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
}
