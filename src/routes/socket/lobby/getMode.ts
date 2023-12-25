import { Socket } from "socket.io";
import { findLobbyViaSocket } from "../../../lib/modules/lobby";

export default function (socket: Socket, callback: (modeID: string) => void) {
    const lobby = findLobbyViaSocket(socket);

    if (lobby === undefined) return callback("");

    callback(lobby.mode);
}
