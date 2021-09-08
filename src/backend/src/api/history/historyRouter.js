import { Router } from 'express';
import { makeInvoker } from 'awilix-express';

import historyController from './historyController';

const router = Router();
const historyApi = makeInvoker(historyController);

router.get('/', historyApi('getMatchDetails'));
router.get('/rank', historyApi('getRank'));

export default router;
