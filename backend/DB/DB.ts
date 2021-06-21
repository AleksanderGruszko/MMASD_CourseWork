import mongoose from 'mongoose';
import {DB_NAME, DB_PWD, DB_USER} from '../config';

const user = encodeURIComponent(DB_USER);
const password = encodeURIComponent(DB_PWD);
const url = `mongodb://${user}:${password}@127.0.0.1:27017/${DB_NAME}?authSource=admin`;

export class DB {
  static async Connect () {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('\x1b[36m%s\x1b[0m', 'DB connection has established');
  }
}
