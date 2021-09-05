export default class historyController {
  constructor({ historyService }) {
    this.historyService = historyService;
  }

  async getPuuid(req, res) {
    try {
      const puuid = await this.historyService.getPuuid();
      res.status(200).json({ puuid });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMessage: err.message });
    }
  }
}
