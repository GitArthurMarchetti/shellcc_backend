import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../service/UserService";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import prismaClient from "../prisma";

class UserController {

    async createUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService()
        const {
            nome,
            email,
            senha
        } = request.body as ({
            nome: string,
            email: string,
           senha: string
        })

        try {
            const { user, token } = await userService.createUser({ nome, email, senha })
            reply.code(200).send({ user, token });
        } catch {
            reply.code(500).send({ error: "Ocorreu um erro ao criar o usuário" });
        }
    }

    async getUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService()

        const users = await userService.getUser()

        reply.send(users)

    }

    async updateUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService()
        const { nome, email, senha, id } = request.body as ({
            id: string,
            nome: string,
            senha: string,
            email: string
        })

        try {
            const user = await userService.updateUser({ id, nome, email, senha });
            reply.send(user);
        } catch (error) {
            reply.code(500).send({ error: "Ocorreu um erro ao atualizar os detalhes do usuário" });
        }
    }

    async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService()
        const { id } = request.body as { id: string }
        const user = await userService.deletarUsuario(id)

        reply.send(user)
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, senha } = request.body as { email: string, senha: string }

        const user = await prismaClient.user.findUnique({
            where: { email }
        })

        if (!user) {
            reply.status(400).send({ success: false, message: 'Email ou senha incorretos' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid)
            reply.status(400).send({ success: false, message: 'Email ou senha incorretos' });
        return (true);
    }
}
export default UserController