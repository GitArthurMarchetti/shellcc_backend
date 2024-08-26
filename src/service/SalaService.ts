import prismaClient from '../prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

interface SalaProps {
    id?: string;
    tituloSala: string;
    descricaoSala: string;
    cor: string;
    totalMembros: number;
    maximoDeMembros: number;
    tokkenAcesso: string;
    resetPasswordToken: string;
}

class SalaService {

    async createSala({ tituloSala, descricaoSala, cor, totalMembros, maximoDeMembros, tokkenAcesso, resetPasswordToken }: SalaProps) {
        let sala;

        if (!tituloSala || !descricaoSala || !cor || !totalMembros || !maximoDeMembros || !tokkenAcesso || !resetPasswordToken) {
            throw new Error("Preencha todos os campos")
        } else {
            try {
                sala = await prismaClient.sala.create({
                    data: {
                        tituloSala, descricaoSala, cor, totalMembros, maximoDeMembros, tokkenAcesso, resetPasswordToken
                    }
                })
            } catch (error) {

                throw new Error("Erro ao criar sala")
            }
        }
        return { sala };
    }


    async getSala() {
        const salas = await prismaClient.sala.findMany()

        return salas
    }

    async deletarSala(id: string) {
        if (!id) {
            throw new Error("Solicitação invalida!")
        }

        const findSalaById = await prismaClient.sala.findFirst({
            where: {
                id
            }
        })

        if (!findSalaById) {
            throw new Error("Nenhuma sala com esse ID!")
        }

        await prismaClient.sala.delete({
            where: {
                id: findSalaById.id
            }
        })

        return { message: 'patrimonio deletado' }

    }

    async updateSala({ id, tituloSala, descricaoSala, cor, totalMembros, maximoDeMembros, tokkenAcesso, resetPasswordToken }: SalaProps) {
        if (!id) {
            throw new Error("Solicitação invalida!")
        }

        const findSalaById = await prismaClient.sala.findFirst({
            where: {
                id
            }
        })
        const sala = await prismaClient.sala.update({
            where: {
                id: findSalaById?.id
            },
            data: {
                id, tituloSala, descricaoSala, cor, totalMembros, maximoDeMembros, tokkenAcesso, resetPasswordToken
            }
        })
        return sala
    }


}

export default SalaService
