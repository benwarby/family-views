import * as express from 'express';
import * as http from 'http';
import WebsocketServer from './socket/websocket-server';
import setupDataAccessEndpoints from './data-access/data-access';
// import * as cors from 'cors';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

const wss = WebsocketServer.getInstance();
if (!wss.isInitialized()) {
    wss.initialize(server)
}

setupDataAccessEndpoints(app)

// app.use(cors({
//     origin: ['http://localhost:3002', 'http://localhost:3002/']
// }))

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${process.env.PORT || 8999} :)`);
});