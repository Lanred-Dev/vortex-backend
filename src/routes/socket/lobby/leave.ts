import { Socket } from "socket.io";
import { findLobbyViaSocket } from "../../../lib/modules/lobby";

export default function (socket: Socket) {
    const lobby = findLobbyViaSocket(socket);

    if (lobby === undefined) return;

    if (socket.data.lobby.host) {
        lobby.removeHost();
    } else {
        lobby.removePlayer(socket.data.username);
    }
}
