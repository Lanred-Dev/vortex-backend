import { Socket } from "socket.io";
import { handleSocketEvent } from "./socketRouter";
import createLobby from "../../routes/socket/lobby/create";
import joinLobby from "../../routes/socket/lobby/join";
import leaveLobby from "../../routes/socket/lobby/leave";
import validateCode from "../../routes/socket/lobby/validateCode";
import validateUsername from "../../routes/socket/lobby/validateUsername";
import getMode from "../../routes/socket/lobby/getMode";
import getPlayers from "../../routes/socket/lobby/getPlayers";

export default function (socket: Socket) {
    handleSocketEvent("host:create", createLobby, socket);
    handleSocketEvent("player:join", joinLobby, socket);
    handleSocketEvent("player:leave", leaveLobby, socket);
    handleSocketEvent("lobby:validateCode", validateCode, socket);
    handleSocketEvent("lobby:validateUsername", validateUsername, socket);
    handleSocketEvent("lobby:getMode", getMode, socket);
    handleSocketEvent("lobby:getPlayers", getPlayers, socket);
}
