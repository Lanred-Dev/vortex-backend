import { Socket } from "socket.io";
import generateRandomString from "../functions/generateRandomString";
import { server } from "../../main";
import { mode } from "./mode";
import { player } from "../types";

export const lobbies: { [key: string]: mode } = {};
const playerLobbyMap: { [key: string]: string } = {};

export class lobby {
    readonly token: string = "";
    readonly code: string = "";
    minPlayers!: number;
    maxPlayers!: number;
    host: Socket | null = null;
    joinable: boolean = true;
    players: player[] = [];
    data: { [key: string]: any } = {};
    lobbyState: string = "lobby";

    constructor(host: Socket) {
        this.token = generateRandomString(15);
        this.code = generateRandomString(4);
        this.addHost(host);
        // The reason that this can be casted to the any type is because this class is always extended into the mode class
        // they are just split for ease of maintainibilty.
        lobbies[this.code] = this as any;
    }

    public addPlayer(socket: Socket, username: string) {
        socket.data.username = username;
        socket.data.lobby = {
            code: this.code,
            token: null,
            host: false,
        };
        socket.join(this.code);
        socket.emit("setLobbyState", this.lobbyState);

        playerLobbyMap[socket.id] = this.code;

        const player: player = {
            username,
            socket,
            data: {},
        };
        this.players.push(player);
        this.host?.emit("player:join", { username, data: player.data }, this.players.length);
    }

    public removePlayer(username: string) {
        const player: player = this.players.find((player: player) => player.username === username)!;
        player.socket.leave(this.code);
        player.socket.data.username = null;
        player.socket.data.lobby = {
            code: null,
            token: null,
            host: false,
        };
        this.players = this.players.filter((player: player) => player.username !== username);
        this.host?.emit("player:join", username, this.players.length);
        delete playerLobbyMap[player.socket.id];
    }

    public addHost(socket: Socket) {
        socket.join(this.code);
        socket.data.lobby = {
            code: this.code,
            token: this.token,
            host: true,
        };
        playerLobbyMap[socket.id] = this.code;
        this.host = socket;
    }

    public removeHost() {
        if (this.host === null) return;

        this.host.leave(this.code);
        this.host.data.lobby = {
            code: null,
            token: null,
            host: false,
        };
        delete playerLobbyMap[this.host.id];
        this.host = null;
    }

    public start() {
        this.joinable = false;
    }

    public destroy() {
        this.removeHost();
        this.players.forEach((player: player) => {
            this.removePlayer(player.username);
        });
        delete lobbies[this.code];
    }

    public emitLobby(...data: any) {
        server.io.to(this.code).emit(...data);
    }

    public playerAction(socket: Socket, action: string) {
        if (action.startsWith("host-") && this.host === socket) {
            if (action === "host-start") {
                this.start();
            } else if (action === "host-getPlayers") {
                return this.players.map((player: player) => player.username);
            }
        } else if (action === "getPlayerCount") {
            return this.players.length;
        } else if (action === "getMaxPlayers") {
            return this.maxPlayers;
        }
    }

    public setLobbyState(state: string) {
        this.lobbyState = state;
        this.emitLobby("setLobbyState", state);
    }
}

export function findLobbyViaSocket(socket: Socket): mode | undefined {
    const code = playerLobbyMap[socket.id];

    if (typeof code === "undefined") return undefined;

    const lobby = lobbies[code as string];
    return lobby;
}

export function validateLobbyCode(code: string): boolean {
    if (typeof code !== "string" || code.length !== 4 || code in lobbies === false) return false;

    return true;
}

export function validateUsernameInLobby(code: string, username: string): boolean {
    if (!validateLobbyCode(code) || !lobbies[code].joinable) return false;
    if (lobbies[code].players.find((player: player) => player.username === username)) return false;

    return true;
}

export function validateLobby(code: string, isHost: boolean = false): boolean {
    if (!validateLobbyCode(code) || !lobbies[code].joinable) return false;
    if (isHost === false && lobbies[code].players.length >= lobbies[code].maxPlayers) return false;

    return true;
}
