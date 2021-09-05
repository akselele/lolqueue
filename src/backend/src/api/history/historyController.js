export default class historyController {
  constructor({ historyService }) {
    this.historyService = historyService;
  }

  async getPuuid(req, res) {
    try {
      const { data } = await this.historyService.getPuuid();
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMessage: err.message });
    }
  }

  async getRecentMatches(req, res) {
    try {
      const { data } = await this.historyService.getRecentMatches();
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMessage: err.message });
    }
  }

  async getMatchDetails(req, res) {
    try {
      const puuid = await this.historyService.getPuuid();

      const matchIds = await this.historyService.getRecentMatches(puuid);

      const matches = [];
      for (let i = 0; i < matchIds.length; i += 1) {
        /* eslint-disable no-await-in-loop */
        const match = await this.historyService.getMatchDetails(matchIds[i]);
        matches.push(match);
      }
      res.status(200).json({ matches });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMessage: err.message });
    }
  }
}
