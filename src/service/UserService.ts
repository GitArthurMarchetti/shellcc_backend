import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prismaClient from '../prisma';
import { randomBytes } from 'crypto';
import { sendEmail } from './sendmail';

interface UserProps {
    id?: string,
    nome?: string
    email?: string
    senha?: string
}

class UserService {
    async createUser({ nome, email, senha }: UserProps) {
        let user;
        let token: string;

        if (!nome || !email || !senha) {
            throw new Error("Preencha todos os campos");
        }

        // Verifica se o usuário já existe com o email fornecido
        const existingUser = await prismaClient.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error("Já existe um usuário com este email");
        }

        try {
            const hashedPassword = await bcrypt.hash(senha, 10);
            user = await prismaClient.user.create({
                data: {
                    nome, email, senha: hashedPassword
                }
            });
            token = jwt.sign({ userId: user.id, userName: user.nome }, 'your-secret-key');
        } catch (error) {
            console.error("Erro ao criar usuário no banco de dados:", error);
            throw new Error("Erro ao criar usuario");
        }

        return { user, token };
    }

    async getUser() {
        const users = await prismaClient.user.findMany()

        return users
    }

    async getUserById(id: string) {
        if (!id) {
            throw new Error("ID do usuário não fornecido");
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return user;
    }

    async getUserByEmail(email: string) {
        if (!email) {
            throw new Error("Email do usuário não fornecido");
        }

        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return user;
    }


    async updateUser({ nome, email, senha, id }: UserProps) {
        if (!id) {
            throw new Error("Solicitação inválida!");
        }

        const findUserById = await prismaClient.user.findFirst({
            where: {
                id
            }
        });

        if (!findUserById) {
            throw new Error("Usuário não encontrado");
        }

        const user = await prismaClient.user.update({
            where: {
                id
            },
            data: {
                nome, email, senha
            }
        });
        return user;
    }

    async deletarUsuario(id: string) {
        if (!id) {
            throw new Error("Nenhum ID alocado");
        }

        const findUserById = await prismaClient.user.findFirst({
            where: {
                id
            }
        });

        if (!findUserById) {
            throw new Error("Nenhum usuário com esse ID!");
        }

        await prismaClient.user.delete({
            where: {
                id
            }
        });

        return { message: 'Usuário deletado' };
    }


    async GenerateToken(email: string) {
        const user = await prismaClient.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const resetPasswordToken = randomBytes(20).toString('hex');

        await prismaClient.user.update({
            where: { email },
            data: { resetPasswordToken },
        });

        // Envie o token por e-mail para o usuário
        await sendEmail({
            to: email,
            subject: 'Redefinição de senha',
            text: `Seu token de redefinição de senha é ${resetPasswordToken}`,
        });
    }


    async ResetarSenha(email: string, resetPasswordToken: string, newPassword: string) {
        const user = await prismaClient.user.findUnique({ where: { email } });

        if (!user || user.resetPasswordToken !== resetPasswordToken) {
            throw new Error("Token inválido ou email não encontrado");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prismaClient.user.update({
            where: { email },
            data: { senha: hashedPassword, resetPasswordToken: null },
        });
    }




}
export default UserService