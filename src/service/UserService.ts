import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prismaClient from '../prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

interface UserProps {
    id?: string,
    nome?: string
    email?: string
    senha?: string
}

class UserService {
    async createUser({ nome, email, senha, }) {
        let user
        let token: string

        if (!nome || !email || !senha) {
            throw new Error("Preenca todos os campos")
        } else {
            try {
                const hashedPassword = await bcrypt.hash(senha, 10)
                user = await prismaClient.user.create({
                    data: {
                        nome, email, senha: hashedPassword
                    }
                })
                token = jwt.sign({ userId: user.id, userName: user.nome }, 'your-secret-key')
            } catch (error) {
                throw new Error("Erro ao criar usuario")
            }
        }
        return { user, token };
    }
    async getUser() {
        const users = await prismaClient.user.findMany()

        return users
    }

    async deletarUsuario(id: string) {
        if (!id) {
            throw new Error("Solicitação invalida!")
        }

        const findUserById = await prismaClient.user.findFirst({
            where: {
                id
            }
        })

        if (!findUserById) {
            throw new Error("Nenhum usuário com esse ID!")
        }

        await prismaClient.user.delete({
            where: {
                id: findUserById.id
            }
        })

        return { message: 'usuario deletado' }

    }

    async updateUser({ nome, email, senha, id }: UserProps) {
        if (!id) {
            throw new Error("Solicitação invalida!")
        }

        const findUserById = await prismaClient.user.findFirst({
            where: {
                id
            }
        })
        const user = await prismaClient.user.update({
            where: {
                id: findUserById.id
            },
            data: {
                nome, email, senha
            }
        })
        return user
    }





}
export default UserService