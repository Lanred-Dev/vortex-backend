import { setting } from "../../../types";

export const title: string = "Vortex";

export const description: string = `Compete against rivals in a turn-based money management game where you aim to collect valuable items without going bankrupt – strategic choices are your key to success!`;

export const minPlayers: number = 2;

export const maxPlayers: number = 10;

export const id: string = "vortex";

export const cardTheme: string = "space";

export const settings: { [key: string]: setting } = {
    rounds: {
        title: "rounds",
        description: "The amount of turns that each player will get.",
        value: [5, 15, 30],
    },
    events: {
        title: "events",
        description: "Whether random events are enabled. Events help to keep players on their toes, by throwing random things at them!",
        value: true,
    },
    moneyPerRound: {
        title: "Money per Round",
        description: "The amount of money each player gets per round.",
        value: [5, 100, 500],
    },
};

const info = { title, description, id, minPlayers, maxPlayers, cardTheme, settings };
export default info;
