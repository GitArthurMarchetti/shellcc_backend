import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import UserController from "./controller/UserController";
import GastoController from "./controller/CategoriaController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    const userController = new UserController();
    const gastoController = new GastoController();

    // Teste
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
    //-------------------------------------------------------------------------------
    // Login
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.login(request, reply)
    })
    //-------------------------------------------------------------------------------
    // UserRoutes
    fastify.post('/user/create', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.createUser(request, reply)
    })
    fastify.get('/user/list', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUser(request, reply)
    })
    fastify.put('/user/update', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.updateUser(request, reply)
    })
    fastify.delete('/user/delete', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.deleteUser(request, reply)
    })
    //-------------------------------------------------------------------------------   
    //GastoRoutes
    fastify.post('/gasto/create', async (request: FastifyRequest, reply: FastifyReply) => {
        return gastoController.createGasto(request, reply)
    })
    fastify.get('/gasto/list', async (request: FastifyRequest, reply: FastifyReply) => {
        return gastoController.getGasto(request, reply)
    })
    fastify.put('/gasto/update', async (request: FastifyRequest, reply: FastifyReply) => {
        return gastoController.updateGasto(request, reply)
    })
    fastify.delete('/gasto/delete', async (request: FastifyRequest, reply: FastifyReply) => {
        return gastoController.deleteGasto(request, reply)
    })
   

}