import { validateUsernameInLobby } from "../../../lib/modules/lobby";

export default function (_socket: any, code: string, username: string, callback: Function) {
    callback(validateUsernameInLobby(code?.toLowerCase(), username));
}
