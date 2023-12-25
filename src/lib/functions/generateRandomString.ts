const characters: string = "abcdefghijklmnopqrstuvwxyz0123456789";

export default function generateRandomString(length: number): string {
    let result: string = "";

    for (let index: number = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}
