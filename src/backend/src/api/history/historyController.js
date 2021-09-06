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
      const puuid = await this.historyProvider.getPuuid();

      const matchIds = await this.historyProvider.getRecentMatches(puuid);

      const matches = [];
      for (let i = 0; i < matchIds.length; i += 1) {
        /* eslint-disable no-await-in-loop */
        const match = await this.historyProvider.getMatchDetails(matchIds[i]);
        matches.push(match);
      }
      res.status(200).json({ matches });
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
        return 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
      case url.indexOf('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/') === 0:
        return 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/';
      case url.indexOf('https://europe.api.riotgames.com/lol/match/v5/matches/') === 0:
        return 'https://europe.api.riotgames.com/lol/match/v5/matches/';
    }
  }
}
