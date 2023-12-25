import { Socket } from "socket.io";

export type setting = {
    title: string;
    description: string;
    value: number[] | number | boolean;
};

export type player = {
    username: string;
    socket: Socket;
    data: { [key: string]: any };
};
