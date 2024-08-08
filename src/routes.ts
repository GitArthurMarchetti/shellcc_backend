import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import UserController from "./controller/UserController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    const userController = new UserController();


    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
    fastify.post('/user', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.createUser(request, reply)
    })
    fastify.get('/user', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUser(request, reply)
    })
    fastify.put('/user/:userId', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.updateUser(request, reply)
    })
    fastify.delete('/user/delete', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.deleteUser(request, reply)
    })

    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.login(request, reply)
    })

}