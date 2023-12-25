import { Socket } from "socket.io";
import { lobbies, validateLobby, validateUsernameInLobby } from "../../../lib/modules/lobby";

// The username variable will be used as the token if the player is joining as the host.
export default function (socket: Socket, asHost: boolean, code: string, username: string, callback: Function) {
    code = code?.toLowerCase();

    if (!validateLobby(code)) return callback(false);

    const lobby = lobbies[code];

    if (asHost && lobby.token === username) {
        lobby.addHost(socket);
        callback(true);
    } else if (!asHost && validateUsernameInLobby(code, username)) {
        lobby.addPlayer(socket, username);
        callback(true);
    } else {
        callback(false);
    }
}
