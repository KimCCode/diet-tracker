import { EntryDB, LogDB, UserDB } from '../models/model';
import { Request, Response } from 'express';

const createLog = async (req: Request, res: Response) => {
  // const { userID } = req.body;
  try {
    // Check if user exists
    // const user = await UserDB.findById(userID);
    // if (!user) {
    //   return res.status(404).json({ msg: `No user with id: ${userID}` });
    // }

    LogDB.create({})
      .then((response) => {
        console.log(response);
        res.status(201).json({ logID: response._id });
      }).catch(() => {
        return res.status(404).json({ msg: 'Unable to create new log' });
      });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getLog = async (req: Request, res: Response) => {
  const userID = req.body.userID;
  const logID = String(req.params.logID);
  try {
    // Check if user exists
    // const user = await UserDB.findById(userID);
    // if (!user) {
    //   return res.status(404).json({ msg: `No user with id: ${userID}` });
    // }

    const log = await LogDB.findById(logID);
    if (!log) {
      return res.status(404).json({ msg: `No log with id: ${logID}` });
    }

    // if (log.ownerID !== userID) {
    //   return res.status(403).json({ msg: 'User does not have access' });
    // }

    res.json({ log });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteLog = async (req: Request, res: Response) => {
  // const userID = req.body.userID;
  const logID = String(req.params.logID);
  try {
    // Check if user exists
    // const user = await UserDB.findById(userID);
    // if (!user) {
    //   return res.status(404).json({ msg: `No user with id: ${userID}` });
    // }

    const log = await LogDB.findById(logID);
    if (!log) {
      return res.status(404).json({ msg: `No log with id: ${logID}` });
    }

    // if (log.ownerID !== userID) {
    //   return res.status(403).json({ msg: 'User does not have access' });
    // }
    EntryDB.deleteMany({ logID })
      .then(() => {
        console.log('Entries successfully deleted');
      })
      .catch(() => {
        return res.status(404).json({ msg: 'No entry with id' });
      });

    LogDB.findByIdAndDelete(logID)
      .then(() => {
      // Should delete entries in log as well
        res.json({ status: 'success' });
      })
      .catch(() => {
        return res.status(404).json({ msg: `No log with id: ${logID}` });
      });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const viewLogsOwned = async (req: Request, res: Response) => {
  // const userID = req.body.userID;
  try {
    // const user = await UserDB.findById(userID);
    // if (!user) {
    //   return res.status(404).json({ msg: `No user with id: ${userID}` });
    // }
    const logsOwned = await LogDB.find({});
    res.json({ logsOwned } );
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export {
  createLog,
  getLog,
  deleteLog,
  viewLogsOwned,
};
