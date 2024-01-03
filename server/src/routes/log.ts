import express from 'express';
import { createLog, getLog, deleteLog, viewLogsOwned } from '../controllers/log';
export const logRoutes = express.Router();

logRoutes.route('/').post(createLog).get(viewLogsOwned);
logRoutes.route('/:logID').get(getLog).delete(deleteLog);
