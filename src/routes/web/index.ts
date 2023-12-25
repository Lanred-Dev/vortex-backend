import { FastifyReply, FastifyRequest } from "fastify";

export default function (_request: FastifyRequest, reply: FastifyReply) {
    reply.code(200).header("Content-Type", "application/json; charset=utf-8").send({ status: "Online." });
}
