import prismaClient from '../prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

interface UserSalaProps {
    id?: string;
    userId: string;
    salaId: string;
    role: string; // Adiciona um campo opcional para o papel do usuário na sala
}

class UserSalaService {

    async createUserSala({ userId, salaId, role }: UserSalaProps) {
        if (!userId || !salaId) {
            throw new Error("User ID e Sala ID são obrigatórios!");
        }

        // Verifica se a associação já existe
        const existingUserSala = await prismaClient.userSala.findUnique({
            where: { userId_salaId: { userId, salaId } },
        });

        if (existingUserSala) {
            throw new Error("Associação entre usuário e sala já existe!");
        }

        try {
            const userSala = await prismaClient.userSala.create({
                data: {
                    userId,
                    salaId,
                    role
                }
            });
            return { userSala };
        } catch (error) {
            throw new Error("Erro ao criar associação entre usuário e sala");
        }
    }

    async getUserSalas() {
        const userSalas = await prismaClient.userSala.findMany();
        return userSalas;
    }

    async getUserSalasByUser(userId: string) {
        if (!userId) {
            throw new Error("User ID é obrigatório!");
        }
        const userSalas = await prismaClient.userSala.findMany({
            where: { userId }
        });
        return userSalas;
    }

    async getUserSalasBySala(salaId: string) {
        if (!salaId) {
            throw new Error("Sala ID é obrigatório!");
        }
        const userSalas = await prismaClient.userSala.findMany({
            where: { salaId }
        });
        return userSalas;
    }

    async deleteUserSala(userId: string, salaId: string) {
        if (!userId || !salaId) {
            throw new Error("User ID e Sala ID são obrigatórios!");
        }

        const userSala = await prismaClient.userSala.findUnique({
            where: { userId_salaId: { userId, salaId } },
        });

        if (!userSala) {
            throw new Error("Associação entre usuário e sala não encontrada!");
        }

        await prismaClient.userSala.delete({
            where: { userId_salaId: { userId, salaId } },
        });

        return { message: 'Associação entre usuário e sala deletada' };
    }

    async updateUserSala({ userId, salaId, role }: UserSalaProps) {
        if (!userId || !salaId) {
            throw new Error("User ID e Sala ID são obrigatórios!");
        }

        const userSala = await prismaClient.userSala.findUnique({
            where: { userId_salaId: { userId, salaId } },
        });

        if (!userSala) {
            throw new Error("Associação entre usuário e sala não encontrada!");
        }

        const updatedUserSala = await prismaClient.userSala.update({
            where: { userId_salaId: { userId, salaId } },
            data: { role },
        });

        return updatedUserSala;
    }
}

export default UserSalaService;
