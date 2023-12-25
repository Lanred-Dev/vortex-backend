import { Socket } from "socket.io";
import vortexMode from "../../../lib/modules/modes/vortex/main";
import { id as vortexID } from "../../../lib/modules/modes/vortex/info";

export default function (socket: Socket, creationData: { mode: string; settings: { [key: string]: number | boolean } }, callback: Function) {
    let mode;

    if (creationData.mode === vortexID) {
        mode = new vortexMode(socket, creationData.settings.rounds as number, creationData.settings.events as boolean, creationData.settings.moneyPerRound as number);
    } else {
        callback(false);
        return;
    }

    callback(true, mode.code, mode.token);
}
