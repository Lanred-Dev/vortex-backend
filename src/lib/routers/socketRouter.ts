import { Socket } from "socket.io";
import { server } from "../../main";
import lobbySocketRouter from "./lobbySocketRouter";
import leaveLobby from "../../routes/socket/lobby/leave";

export function handleSocketEvent(event: string, handler: Function, socket: Socket, ...customData: any[]) {
    socket.on(event, (...eventData: any[]) => {
        handler(socket, ...customData, ...eventData);
    });
}

export default function () {
    server.ready().then(() => {
        server.io.on("connection", (socket: Socket) => {
            socket.data.username = null;
            socket.data.lobby = {
                code: null,
                token: null,
                host: false,
            };

            lobbySocketRouter(socket);

            socket.on("disconnect", () => {
                leaveLobby(socket);
            });
        });
    });
}
