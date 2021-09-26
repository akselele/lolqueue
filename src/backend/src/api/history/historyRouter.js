import { Router } from 'express';
import { makeInvoker } from 'awilix-express';

import historyController from './historyController';

const router = Router();
const historyApi = makeInvoker(historyController);

router.get('/matches', historyApi('getMatchCached'));
router.get('/rank', historyApi('getRankCached'));
router.get('/refresh/rank', historyApi('getRankRefresh'));
router.get('/refresh/matches', historyApi('getMatchRefresh'));

export default router;
