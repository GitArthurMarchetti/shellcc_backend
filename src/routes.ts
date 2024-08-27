import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import UserController from "./controller/UserController";
import GastoController from "./controller/GastoController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    const userController = new UserController();
    const gastoController = new GastoController();

    // Teste
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
    //-------------------------------------------------------------------------------
    // Login e afins
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.login(request, reply)
    })
    fastify.post("/generateResetPasswordToken", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.GerarToken(request, reply)
    })
    fastify.post("/resetPassword", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.ResetarSenhaController(request, reply)
    })
    //-------------------------------------------------------------------------------
    // UserRoutes
    fastify.post('/user/create', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.createUser(request, reply)
    })
    fastify.get('/user/list', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUser(request, reply)
    })
    fastify.get('/user/id/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUserById(request, reply)
    })
    fastify.post('/user/email', async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUserByEmail(request, reply)
    })
    fastify.put('/user/:id', async (request, reply) => {
        return userController.updateUser(request, reply);
    });
    fastify.delete('/user/:id', async (request, reply) => {
        return userController.deleteUser(request, reply);
    });
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