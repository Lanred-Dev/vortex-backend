import { Socket } from "socket.io";
import { player } from "../../../types";
import { mode } from "../../mode";
import { minPlayers, maxPlayers, id } from "./info";

export default class vortex extends mode {
    minPlayers = minPlayers;
    maxPlayers = maxPlayers;
    items: string[] = [];
    moneyPerRound: number = 15;

    constructor(host: Socket, rounds: number, events: boolean, moneyPerRound: number) {
        super(host, rounds, events);
        this.mode = id;
        this.eventChance = events ? 5 : 0;
        this.moneyPerRound = moneyPerRound;
    }

    public start() {
        super.start();

        this.players.forEach((player: player) => {
            player.data.money = 0;
            player.data.items = [];
            player.data.upgrades = [];
        });
    }

    public chooseEvent() {}

    public setPlayerTurn(player: player) {
        player.data.money += this.moneyPerRound;
        super.setPlayerTurn(player);
    }
}
