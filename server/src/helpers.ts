import hash from 'hash.js';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

function myHash(string: string) {
  return String(hash.sha256().update(string).digest('hex'));
}

function generateToken(userID: Types.ObjectId) {
  const payload = { userID };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });
}
export {
  myHash,
  generateToken,
};
