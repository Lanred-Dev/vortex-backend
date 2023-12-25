import { server } from "../../main";
import indexRoute from "../../routes/web/index";
import getRoute from "../../routes/web/get";

export default function () {
    server.get("/", indexRoute);
    server.get("/get", getRoute);
}
