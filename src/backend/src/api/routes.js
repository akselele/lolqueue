import { Router } from 'express';
import historyRouter from './history/historyRouter';

const router = Router();

router.use('/history', historyRouter);
export default router;
