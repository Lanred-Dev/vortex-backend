import { Socket } from "socket.io";
import { lobby } from "./lobby";
import { player } from "../types";

export class mode extends lobby {
    eventChance: number = 15;
    round: number = 0;
    totalRounds: number = 0;
    eventsEnabled: boolean = false;
    winner!: player | player[];
    currentPlayerIndex!: number;
    currentPlayerID: string | null = null;
    mode!: string;

    constructor(host: Socket, rounds: number, events: boolean) {
        super(host);
        this.totalRounds = rounds;
        this.eventsEnabled = events;
    }

    public start() {
        super.start();
        this.nextRound();
    }

    public playerAction(socket: Socket, action: string) {
        // The game has not started so route the action to the lobby class.
        if (this.joinable === true) return super.playerAction(socket, action);

        if (!this.isPlayersTurn(socket)) return;

        this.nextPlayer();
    }

    private end() {
        super.destroy();
    }

    private nextRound() {
        this.round++;

        if (this.round >= this.totalRounds) return this.end();

        this.currentPlayerIndex = -1;
        this.currentPlayerID = null;
        this.emitLobby("setRound", this.round);
        this.nextPlayer();
    }

    private nextPlayer() {
        this.currentPlayerIndex++;
        this.currentPlayerID = this.players[this.currentPlayerIndex].socket.id;
        this.setPlayerTurn(this.players[this.currentPlayerIndex]);
    }

    public setPlayerTurn(player: player) {
        player.socket.emit("updatePlayerData", player.data);
        this.emitLobby("setTurn", player.socket.data.username);

        const currentRound: number = this.round;
        setTimeout(() => {
            if (this.currentPlayerID !== player.socket.id || this.round !== currentRound) return;

            this.nextPlayer();
        }, 30 * 1000);
    }

    private isPlayersTurn(socket: Socket): boolean {
        return this.currentPlayerID === socket.id;
    }
}
