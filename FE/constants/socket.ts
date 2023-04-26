import { io, Socket } from "socket.io-client";

class socketInstance {
  private constructor() {}

  private static socket: Socket;

  public static getSocket(address: string, signature: string): Socket {
    // if (!socketInstance.socket) {
    socketInstance.socket = io("ws://localhost:3008", {
      extraHeaders: {
        authorize: signature,
      },
      auth: {
        authorize: `${address}:${signature}`,
      },
      transports: ["websocket"],
      //   reconnection: true,
    });
    console.log(`connected to socket`);
    // }
    console.log(socketInstance.socket.connected);

    return socketInstance.socket;
  }
}

export { socketInstance };
