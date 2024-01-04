import { io, Socket } from "socket.io-client";

class socketInstance {
  private constructor() {}

  private static socket: Socket;

  public static getSocket(address: string, signature: string): Socket {
    if (!socketInstance.socket) {
      socketInstance.socket = io("ws://localhost:3008", {
        extraHeaders: {
          authorize: signature,
        },
        auth: {
          authorize: `${address}:${signature}`,
        },
        transports: ["websocket"],
        reconnection: true,
      });
      socketInstance.socket.connect();
      socketInstance.socket.on("connect", () => {
        console.log(`Connected`, socketInstance.socket.id);
      });
      socketInstance.socket.on("connect_error", (err) => {
        console.log(`Connect_error:`, err);
      });
      socketInstance.socket.on("reconnect", () => {
        console.log(`reconnect`);
      });
      socketInstance.socket.on("disconnect", () => {
        console.log(`disconnect`);
      });
    }

    return socketInstance.socket;
  }
}

export { socketInstance };
