import { BaseMessageType } from "@family-views/common";
import * as http from "http";
import * as WebSocket from "ws";

interface ExtWebSocket extends WebSocket {
  isAlive: boolean;
}

class WebsocketServer {
  private static instance: WebsocketServer;
  private wss: WebSocket.Server | null = null;

  private constructor() {}

  public static getInstance(): WebsocketServer {
    if (!WebsocketServer.instance) {
      WebsocketServer.instance = new WebsocketServer();
    }
    return WebsocketServer.instance;
  }

  public isInitialized(): boolean {
    return this.wss != null;
  }

  public initialize(server: http.Server) {
    if (this.isInitialized()) {
      throw new Error("Websocket server is already initialized");
    }
    this.wss = new WebSocket.Server({ server });
  }

  private setup() {
    if (this.wss == null) {
      throw new Error("Websocket server is not initialized.");
    }

    this.wss.on("connection", (ws: WebSocket) => {
      const extWs = ws as ExtWebSocket;

      extWs.isAlive = true;

      ws.on("pong", () => {
        extWs.isAlive = true;
      });

      //connection is up, let's add a simple simple event
      ws.on("message", (msg: string) => {
        const message = JSON.parse(msg) as BaseMessageType;

        setTimeout(() => {
          // if (message.isBroadcastMessage) {

          if (this.wss == null) {
            throw new Error("Websocket server is not initialized");
          }
          //send back the message to the other clients
          this.wss.clients.forEach((client) => {
            if (client != ws) {
              client.send(
                this.createMessage(message.content, true, message.sender)
              );
            }
          });

          // }

          ws.send(
            this.createMessage(
              `You sent -> ${message.content}`,
              message.isBroadcastMessage
            )
          );
        }, 1000);
      });

      //send immediatly a feedback to the incoming connection
      ws.send(this.createMessage("Hi there, I am a WebSocket server"));

      ws.on("error", (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
      });
    });

    setInterval(this.keepAlive, 10000);
  }

  private keepAlive() {
    if (this.wss == null) {
      throw new Error("Websocket server is not initialized");
    }
    this.wss.clients.forEach((value, key, set) => {
      const extWs = value as ExtWebSocket;

      if (!extWs.isAlive) return value.terminate();

      extWs.isAlive = false;
      value.ping(null, undefined);
    });
  }

  public sendMesssage(message: BaseMessageType) {}

  public createMessage(
    content: string,
    isBroadcastMessage = false,
    sender = "NS"
  ): string {
    let message: BaseMessageType = {
      isBroadcastMessage,
      content,
      sender,
    };
    return JSON.stringify(message);
  }
}

export default WebsocketServer;
