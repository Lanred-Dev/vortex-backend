import { FastifyReply, FastifyRequest } from "fastify";
import vortexGameInfo from "../../lib/modules/modes/vortex/info";

export default function (_request: FastifyRequest, reply: FastifyReply) {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
            modes: [vortexGameInfo],
        });
}
