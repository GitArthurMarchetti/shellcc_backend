import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../service/UserService";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import prismaClient from "../prisma";

class UserController {

    async createUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService();
        const { nome, email, senha } = request.body as { nome: string, email: string, senha: string };

        try {
            const { user, token } = await userService.createUser({ nome, email, senha });
            reply.code(200).send({ user, token });
        } catch (error) {
            console.error("Erro ao criar usuário:", error); // Adicionado para capturar o erro
            reply.code(500).send({ error: "Ocorreu um erro ao criar o usuário" });
        }
    }


    async getUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService();
        const users = await userService.getUser();
        reply.send(users);
    }

    async getUserById(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService();
        const { id } = request.params as { id: string };

        try {
            const user = await userService.getUserById(id);
            reply.send(user);
        } catch (error) {
            reply.code(404).send({ error: "Usuário não encontrado" });
        }
    }

    async getUserByEmail(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService();
        const { email } = request.body as { email: string };

        try {
            const user = await userService.getUserByEmail(email);
            reply.send(user);
        } catch (error) {
            reply.code(404).send({ error: "Usuário não encontrado" });
        }
    }

    async updateUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService();
        const { id } = request.params as { id: string };
        const { nome, email, senha } = request.body as {
            nome: string,
            senha: string,
            email: string
        };

        try {
            const user = await userService.updateUser({ id, nome, email, senha });
            reply.send(user);
        } catch (error) {
            reply.code(500).send({ error: "Ocorreu um erro ao atualizar os detalhes do usuário" });
        }
    }

    async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const userService = new UserService();
        const { id } = request.params as { id: string };

        try {
            const user = await userService.deletarUsuario(id);
            reply.send(user);
        } catch (error) {
            reply.code(500).send({ error: "Ocorreu um erro ao deletar o usuário" });
        }
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, senha } = request.body as { email: string, senha: string };

        const user = await prismaClient.user.findUnique({
            where: { email }
        });

        if (!user) {
            reply.status(400).send({ success: false, message: 'Email ou senha incorretos' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            reply.status(400).send({ success: false, message: 'Email ou senha incorretos' });
            return;
        }

        const token = jwt.sign({ userId: user.id, userName: user.nome }, 'your-secret-key');
        reply.send({ success: true, token });
    }

    async GerarToken(request: FastifyRequest, reply: FastifyReply) {
        const generateResetPasswordTokenService = new UserService();
        const { email } = request.body as { email: string };

        try {
            await generateResetPasswordTokenService.GenerateToken(email);
            reply.send({ message: "Token de redefinição de senha enviado para o email" });
        } catch (error) {
            reply.code(500).send({ error: "Erro ao gerar o token de redefinição de senha" });
        }
    }

    async ResetarSenhaController(request: FastifyRequest, reply: FastifyReply) {
        const resetPasswordService = new UserService();
        const { email, resetPasswordToken, newPassword } = request.body as { email: string, resetPasswordToken: string, newPassword: string };

        try {
            await resetPasswordService.ResetarSenha(email, resetPasswordToken, newPassword);
            reply.send({ message: 'Senha redefinida com sucesso' });
        } catch (error) {
            reply.code(500).send({ error: "Erro ao redefinir a senha" });
        }
    }
}

export default UserController;
