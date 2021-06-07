import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import {DB} from './DB/DB';
import {SERVER_PORT} from './config';

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/', (req, res) => {
  res.send('ebala');
});

async function runServer () {
  await DB.Connect();
  console.log('\x1b[36m%s\x1b[0m', 'DB was connected');
  await app.listen(SERVER_PORT);
  console.log('\x1b[36m%s\x1b[0m', `Server is running in http://localhost:${SERVER_PORT}`);
}

runServer().catch((e) => {
  console.log(e);
})
