import express from "express";
import * as http from "http";
import WebsocketServer from "./socket/websocket-server";
import setupDataAccessEndpoints from "./data-access/data-access";
import cors from "cors";
import { toAWSDependencies } from "./aws/aws-dependencies";

const app = express();
app.use(express.json());
app.use(cors());

//initialize a simple http server
const server = http.createServer(app);

const wss = WebsocketServer.getInstance();
if (!wss.isInitialized()) {
  wss.initialize(server);
}

app.post("/hello", (req, res) => {
  res.send("Hi");
});
toAWSDependencies().then((dependencies) => {
  setupDataAccessEndpoints(dependencies, app);
});

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${process.env.PORT || 8999} :)`);
});
