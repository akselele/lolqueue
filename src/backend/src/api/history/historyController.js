export default class historyController {
  constructor({ historyProvider }) {
    this.historyProvider = historyProvider;
  }

  // Next 2 methods dont get used, just there to check for errors
  async getPuuid(req, res) {
    try {
      const { data } = await this.historyProvider.getPuuid();
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMessage: err.message });
    }
  }

  async getRecentMatches(req, res) {
    try {
      const { data } = await this.historyProvider.getRecentMatches();
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMessage: err.message });
    }
  }

  async getMatchDetails(req, res) {
    try {
      const puuid = await this.historyProvider.getPuuid(req.query.ign);
      const matchIds = await this.historyProvider.getRecentMatches(puuid.data.puuid);
      const promises = [];
      /* eslint-disable-next-line */
      for (let i = 0; i < matchIds.data.length; i++) {
        promises.push(this.historyProvider.getMatchDetails(matchIds.data[i]));
      }
      const matches = await Promise.all(promises);
      const filteredMatches = matches.map(el => el.data);
      res.status(200).json({ filteredMatches });
    } catch (err) {
      if (err.response.status === 503) {
        res.status(400).json({ errMessage: `There seems to be an issue with the Riot API, please try again later. Error at: '${this.getApiCall(err.config.url)}'` });
      } else {
        res.status(400).json({ errMessage: `There seems to be an unknown error. Errorcode: ${err.response.status}` });
      }
    }
  }

  getApiCall(url) {
    switch (url) {
      default:
        return 'matchdetails';
      case url.indexOf('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/') === 0:
        return 'https://euw1.api.getriotgames.com/lol/summoner/v4/summoners/by-name/';
      case url.indexOf('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/') === 0:
        return 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/';
      case url.indexOf('https://europe.api.riotgames.com/lol/match/v5/matches/') === 0:
        return 'https://europe.api.riotgames.com/lol/match/v5/matches/';
    }
  }

  /* eslint-disable-next-line */
  async getRank(req, res) {
    try {
      const data = await this.historyProvider.getRank(req.query.ign);
      const filteredData = data.data.filter(el => el.queueType === 'RANKED_SOLO_5x5');
      res.status(200).json({ filteredData });
    } catch (err) {
      res.status(400).json({ errMessage: `There seems to be an unknown error. Errorcode: ${err.response.status}` });
    }
  }
}
