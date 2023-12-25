import fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { Server } from "socket.io";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import router from "./lib/routers/router";
import socketRouter from "./lib/routers/socketRouter";

dotenv.config();

export const server = fastify({
    logger: process.env.NODE_ENV === "development" ? true : false,
}) as unknown as any;

(async () => {
    try {
        await server.register(cors, {
            origin: "*",
        });

        await server.register(fastifySocketIO, {
            origin: "/",
            cors: {
                origin: "*",
            },
        });

        router();
        socketRouter();

        await server.listen({ port: parseInt(process.env.PORT || "1000") });
    } catch (error) {
        server.log.error(error);
        process.exit(-1);
    }
})();

declare module "fastify" {
    interface FastifyInstance {
        io: Server;
    }
}
