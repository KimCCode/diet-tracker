import { myHash } from '../helpers';
import { UserDB } from '../models/model';
import { Request, Response } from 'express';

const authRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    UserDB.create({
      username,
      email,
      password: myHash(password),
    })
      .then(() => {
        res.status(201).json({ status: 'success' });
      })
      .catch(() => {
        return res.status(404).json({ msg: 'Unable to register new user' });
      });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export {
  authRegister,
};
