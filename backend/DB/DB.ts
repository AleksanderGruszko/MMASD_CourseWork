import {MongoClient} from 'mongodb';
import {DB_NAME, DB_PWD, DB_USER} from '../config';

const user = encodeURIComponent(DB_USER);
const password = encodeURIComponent(DB_PWD);
const uri = `mongodb://${user}:${password}@127.0.0.1:27017/?authSource=admin`;

const client = new MongoClient(uri);

export class DB {
  static async Connect () {
    return await client.connect();
  }

  static GetDB () {
    return client.db(DB_NAME);
  }
}
