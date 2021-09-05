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
      const { data } = await this.historyService.getMatchDetails();
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMessage: err.message });
    }
  }
}
