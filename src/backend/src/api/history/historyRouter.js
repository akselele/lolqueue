import { Router } from 'express';
import { makeInvoker } from 'awilix-express';

import historyController from './historyController';

const router = Router();
const historyApi = makeInvoker(historyController);

router.get('/', historyApi('getPuuid'));

export default router;
