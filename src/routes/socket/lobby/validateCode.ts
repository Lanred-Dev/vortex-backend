import { validateLobby } from "../../../lib/modules/lobby";

export default function (_socket: any, code: string, callback: Function) {
    callback(validateLobby(code?.toLowerCase()));
}
