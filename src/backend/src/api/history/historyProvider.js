require('dotenv').config();
const axios = require('axios');
const axiosRetry = require('axios-retry');
const rateLimit = require('axios-rate-limit');

const axiosLimit = rateLimit(axios.create({ headers: { 'X-Riot-Token': process.env.RIOT_KEY } }), { maxRequests: 230, perMilliseconds: 10000, maxRPS: 19 });
axiosRetry(axiosLimit, {
  retryCondition: (e) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(e) 
      || e.response.status === 429
    );
  },
  retryDelay: (retryCount, error) => {
    if (error.response) {
      const retryAfter = error.response.headers['retry-after'];
      if (retryAfter) {
        console.log(`Retrying in ${retryAfter} seconds`);
        return retryAfter;
      }
    }
    // Can also just return 0 here for no delay if one isn't specified
    return axiosRetry.exponentialDelay(retryCount);
  },
});

export default class historyProvider {
  // key = process.env.RIOT_KEY
  // user = process.env.IGN

  async getPuuid(ign) {
    const response = await axiosLimit.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(ign)}`);
    return response;
  }

  async getRecentMatches(puuid) {
    const response = await axiosLimit.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`);
    return response;
  }

  async getMatchDetails(matchId) {
    const response = await axiosLimit.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`);
    return response;
  }

  async getRank(ign) {
    const info = await axiosLimit.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(ign)}`);
    const response = await axiosLimit.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${info.data.id}`);
    return response;
  }
}
