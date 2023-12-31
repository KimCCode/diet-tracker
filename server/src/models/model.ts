import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

// Interface of the Log Object
const EntrySchema = new mongoose.Schema({
  entryName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  logID: String,
  quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  calories: {
    type: Number,
    default: 0,
    min: 0,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

const EntryDB = mongoose.model('Entry', EntrySchema);

const LogSchema = new mongoose.Schema({
  numEntries: {
    type: Number,
    default: 0,
  },
  calories: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const LogDB = mongoose.model('Log', LogSchema);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email: string) => isEmail(email)
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const UserDB = mongoose.model('User', UserSchema);

export {
  EntryDB,
  LogDB,
  UserDB,
};
