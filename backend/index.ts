import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import {DB} from './DB/DB';
import {SERVER_PORT} from './config';
import {combineRoutes} from './routes';

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

combineRoutes(app);

async function runServer () {
  await DB.Connect();
  await app.listen(SERVER_PORT);
  console.log('\x1b[36m%s\x1b[0m', `Server is running in http://localhost:${SERVER_PORT}`);
}

runServer().catch((e) => {
  console.log(e);
})
