import { EntryDB, LogDB, UserDB } from '../models/model';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const createEntry = (req: Request, res: Response) => {
  const token = req.header('Authorization');
  const { entryName, calories } = req.body;
  const logID = req.params.logID;

  jwt.verify(token, process.env.JWT_SECRET, async (err: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Token has expired' });
      } else {
        return res.status(401).json({ msg: 'Token verification failed' });
      }
    } else {
      const userID = decoded.userID;
      try {
        const user = await UserDB.findById(userID);
        if (!user) {
          return res.status(404).json({ msg: `No user with id: ${userID}` });
        }

        const log = await LogDB.findById(logID);
        if (!log) {
          return res.status(404).json({ msg: `No log with id: ${logID}` });
        }

        if (String(log.ownerID) !== userID) {
          return res.status(403).json({ msg: 'User does not have access' });
        }

        if (log.numEntries >= 25) {
          return res.status(400).json({ msg: 'Max entries exceeded' });
        }

        EntryDB.create({ entryName, logID, calories })
          .then(() => {
            log.numEntries += 1;
            log.calories += parseInt(calories);
            log.save()
              .then(() => {
                res.status(201).json({ status: 'success' });
              })
              .catch(() => {
                return res.status(400).json({ msg: 'Unable to save data' });
              });
          }).catch(() => {
            return res.status(400).json({ msg: 'Unable to create new entry' });
          });
      } catch (error) {
        return res.status(500).json({ msg: error });
      }
    }
  });
};

const getEntry = (req: Request, res: Response) => {
  const token = req.header('Authorization');
  const logID = req.params.logID;
  const entryID = req.params.entryID;

  jwt.verify(token, process.env.JWT_SECRET, async (err: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Token has expired' });
      } else {
        return res.status(401).json({ msg: 'Token verification failed' });
      }
    } else {
      const userID = decoded.userID;
      try {
        const user = await UserDB.findById(userID);
        if (!user) {
          return res.status(404).json({ msg: `No user with id: ${userID}` });
        }

        const log = await LogDB.findById(logID);
        if (!log) {
          return res.status(404).json({ msg: `No log with id: ${logID}` });
        }

        if (String(log.ownerID) !== userID) {
          return res.status(403).json({ msg: 'User does not have access' });
        }

        const entry = await EntryDB.findById(entryID);
        if (!entry) {
          return res.status(404).json({ msg: `No entry with id: ${entryID}` });
        }

        res.json({ entry });
      } catch (error) {
        return res.status(500).json({ msg: error });
      }
    }
  });
};

const deleteEntry = (req: Request, res: Response) => {
  const token = req.header('Authorization');
  const logID = req.params.logID;
  const entryID = req.params.entryID;

  jwt.verify(token, process.env.JWT_SECRET, async (err: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Token has expired' });
      } else {
        return res.status(401).json({ msg: 'Token verification failed' });
      }
    } else {
      const userID = decoded.userID;
      try {
        const user = await UserDB.findById(userID);
        if (!user) {
          return res.status(404).json({ msg: `No user with id: ${userID}` });
        }

        const log = await LogDB.findById(logID);
        if (!log) {
          return res.status(404).json({ msg: `No log with id: ${logID}` });
        }

        if (String(log.ownerID) !== userID) {
          return res.status(403).json({ msg: 'User does not have access' });
        }

        const entry = await EntryDB.findById(entryID);
        if (!entry) {
          return res.status(404).json({ msg: `No entry with id: ${entryID}` });
        }

        EntryDB.findByIdAndDelete(entryID)
          .then(() => {
            log.numEntries -= 1;
            log.calories -= entry.calories;
            log.save()
              .then(() => {
                res.json({ status: 'success' });
              }).catch(() => {
                return res.status(400).json({ msg: 'Unable to save data' });
              });
          }).catch(() => {
            return res.status(404).json({ msg: `No entry with id: ${entryID}` });
          });
      } catch (error) {
        return res.status(500).json({ msg: error });
      }
    }
  });
};

const updateEntry = (req: Request, res: Response) => {
  const token = req.header('Authorization');
  const logID = req.params.logID;
  const entryID = req.params.entryID;
  const { entryName, calories } = req.body;
  console.log(calories);
  jwt.verify(token, process.env.JWT_SECRET, async (err: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Token has expired' });
      } else {
        return res.status(401).json({ msg: 'Token verification failed' });
      }
    } else {
      const userID = decoded.userID;
      try {
        const user = await UserDB.findById(userID);
        if (!user) {
          return res.status(404).json({ msg: `No user with id: ${userID}` });
        }

        const log = await LogDB.findById(logID);
        if (!log) {
          return res.status(404).json({ msg: `No log with id: ${logID}` });
        }

        if (String(log.ownerID) !== userID) {
          return res.status(403).json({ msg: 'User does not have access' });
        }

        const entry = await EntryDB.findById(entryID);
        if (!entry) {
          return res.status(404).json({ msg: `No entry with id: ${entryID}` });
        }
        const oldCalories = entry.calories;
        EntryDB.findByIdAndUpdate(entryID, {
          entryName,
          calories
        })
          .then(() => {
            log.calories = log.calories - oldCalories + parseInt(calories);
            log.save()
              .then(() => {
                res.json({ status: 'success' });
              }).catch(() => {
                return res.status(400).json({ msg: 'Unable to save data' });
              });
          }).catch(() => {
            return res.status(404).json({ msg: `No entry with id: ${entryID}` });
          });
      } catch (error) {
        return res.status(500).json({ msg: error });
      }
    }
  });
};

const viewLogEntries = (req: Request, res: Response) => {
  const token = req.header('Authorization');
  const logID = req.params.logID;

  jwt.verify(token, process.env.JWT_SECRET, async (err: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Token has expired' });
      } else {
        return res.status(401).json({ msg: 'Token verification failed' });
      }
    } else {
      const userID = decoded.userID;
      try {
        const user = await UserDB.findById(userID);
        if (!user) {
          return res.status(404).json({ msg: `No user with id: ${userID}` });
        }

        const log = await LogDB.findById(logID);
        if (!log) {
          return res.status(404).json({ msg: `No log with id: ${logID}` });
        }

        if (String(log.ownerID) !== userID) {
          return res.status(403).json({ msg: 'User does not have access' });
        }

        const entries = await EntryDB.find({ logID });
        if (!entries) {
          return res.status(404).json({ msg: 'No entry with id' });
        }

        res.json({ entries });
      } catch (error) {
        return res.status(500).json({ msg: error });
      }
    }
  });
};

export {
  createEntry,
  getEntry,
  deleteEntry,
  updateEntry,
  viewLogEntries,
};
