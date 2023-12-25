import { Socket } from "socket.io";
import { findLobbyViaSocket } from "../../../lib/modules/lobby";

export default function (socket: Socket, callback: (newPlayerCount: number, newMaxPlayers: number) => void) {
    const lobby = findLobbyViaSocket(socket);

    if (lobby === undefined) return callback(0, 0);

    callback(lobby.players.length, lobby.maxPlayers);
}
