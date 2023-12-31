import express from 'express';
import { createEntry, updateEntry, getEntry, deleteEntry, viewLogEntries } from '../controllers/entry';
export const entryRoutes = express.Router();

entryRoutes.route('/:logID').post(createEntry).get(viewLogEntries);
entryRoutes.route('/:logID/:entryID').get(getEntry).delete(deleteEntry).put(updateEntry);
