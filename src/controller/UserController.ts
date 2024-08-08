import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../service/UserService";
import bcrypt from 'bcrypt';
import prismaClient from "../prisma";

class UserController {

    async createUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService()
        const { nome, email, senha } = request.body as ({ nome: string, senha: string, email: string })

        try {
            const { user, token } = await userService.createUser({ nome, email, senha })
            reply.send({ user, token })
        } catch {
            reply.send({ error: "Ocorreu um erro ao criar o usuário" });
        }
    }

    async getUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService()

        const users = await userService.getUser()

        reply.send(users)

    }

    async updateUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService()
        const { nome, email, senha } = request.body as ({ nome: string, senha: string, email: string })

        try {
            const user = await userService.updateUser({ nome, email, senha });

            reply.send({ user });
        } catch (error) {
            reply.send({ error: "Ocorreu um erro ao atualizar os detalhes do usuário" });
        }
    }

    async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService()

        const { id } = request.query as { id: string }

        const user = await userService.deletarUsuario(id)

        reply.send(user)
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as { email: string, password: string }

        const user = await prismaClient.user.findUnique({
            where: { email }
        })

        if (!user) {
            reply.status(400).send({ success: false, message: 'Email ou senha incorretos' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            reply.status(400).send({ success: false, message: 'Email ou senha incorretos' });
        return;
    }
}
export default UserController