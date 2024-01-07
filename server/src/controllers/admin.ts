import { generateToken, myHash } from '../helpers';
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
      .then((createdUser) => {
        const token = generateToken(createdUser._id);
        res.json({ status: 'success', token });
      })
      .catch(() => {
        return res.status(404).json({ msg: 'Unable to register new user' });
      });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserDB.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User doesnt exist' });
    }
    if (user.password !== myHash(password)) {
      return res.status(403).json({ msg: 'Incorrect password' });
    }

    const token = generateToken(user._id);
    res.json({ status: 'success', token });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export {
  authRegister,
  login,
};
