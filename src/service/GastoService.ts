import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prismaClient from '../prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

interface GastosProps {
    id?: string,
    titulo?: string,
    descricao?: string,
    preco?: number,
    dataGasto?: Date,
    repeticao?: boolean,
}

class GastoService {

    async createGasto({ titulo, descricao, preco, dataGasto, repeticao }: GastosProps) {
        let gasto;

        if (!titulo || !preco || !dataGasto || !repeticao) {
            throw new Error("Preencha todos os campos")
        } else {
            try {
                gasto = await prismaClient.gasto.create({
                    data: {
                        titulo, descricao, preco, dataGasto, repeticao
                    }
                })
            } catch (error) {
                throw new Error("Erro ao criar gasto")
            }
        }
        return { gasto };
    }


    async getGasto() {
        const gastos = await prismaClient.gasto.findMany()

        return gastos
    }

    async deletarGasto(id: string) {
        if (!id) {
            throw new Error("Solicitação invalida!")
        }

        const findGastoById = await prismaClient.gasto.findFirst({
            where: {
                id
            }
        })

        if (!findGastoById) {
            throw new Error("Nenhum gasto com esse ID!")
        }

        await prismaClient.gasto.delete({
            where: {
                id: findGastoById.id
            }
        })

        return { message: 'gasto deletado' }

    }

    async updateGasto({ id, titulo, descricao, preco, dataGasto, repeticao }: GastosProps) {
        if (!id) {
            throw new Error("Solicitação invalida!")
        }

        const findGastoById = await prismaClient.gasto.findFirst({
            where: {
                id
            }
        })
        const gasto = await prismaClient.gasto.update({
            where: {
                id: findGastoById?.id
            },
            data: {
                id, titulo, descricao, preco, dataGasto, repeticao
            }
        })
        return gasto
    }


}

export default GastoService