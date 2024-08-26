import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prismaClient from '../prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

interface PatrimoniosProps {
    id?: string
    tituloPatrimonio?: string
    descricaoPatrimonio?: string
    codigo?: number
    valorDaAquisicao?: number
    valorFinal?: number
    valorAtual: number
    situacao?: number
    localizacao: string
    porcentagemDesvalorizacao?: number
}

class PatrimonioService {

    async createPatrimonio({ tituloPatrimonio, descricaoPatrimonio, codigo, valorDaAquisicao, valorFinal, valorAtual, situacao, localizacao, porcentagemDesvalorizacao }: PatrimoniosProps) {
        let patrimonio;

        if (!tituloPatrimonio || !codigo || !valorDaAquisicao || !valorFinal || !situacao || !porcentagemDesvalorizacao ) {
            throw new Error("Preencha todos os campos")
        } else {
            try {
                patrimonio = await prismaClient.patrimonio.create({
                    data: {
                        tituloPatrimonio, descricaoPatrimonio, codigo, valorDaAquisicao, valorFinal, valorAtual, situacao, localizacao, porcentagemDesvalorizacao
                    }
                })
            } catch (error) {

                throw new Error("Erro ao criar patrimônio")
            }
        }
        return { patrimonio };
    }


    async getPatrimonio() {
        const patrimonios = await prismaClient.patrimonio.findMany()

        return patrimonios
    }

    async deletarPatrimonio(id: string) {
        if (!id) {
            throw new Error("Solicitação invalida!")
        }

        const findPatrimonioById = await prismaClient.patrimonio.findFirst({
            where: {
                id
            }
        })

        if (!findPatrimonioById) {
            throw new Error("Nenhum patrimônio com esse ID!")
        }

        await prismaClient.patrimonio.delete({
            where: {
                id: findPatrimonioById.id
            }
        })

        return { message: 'patrimonio deletado' }

    }

    async updatePatrimonio({ id, tituloPatrimonio, descricaoPatrimonio, codigo, valorDaAquisicao, valorFinal, valorAtual, situacao, localizacao, porcentagemDesvalorizacao}: PatrimoniosProps) {
        if (!id) {
            throw new Error("Solicitação invalida!")
        }

        const findPatrimonioById = await prismaClient.patrimonio.findFirst({
            where: {
                id
            }
        })
        const patrimonio = await prismaClient.patrimonio.update({
            where: {
                id: findPatrimonioById?.id
            },
            data: {
                id, tituloPatrimonio, descricaoPatrimonio, codigo, valorDaAquisicao, valorFinal, valorAtual, situacao, localizacao, porcentagemDesvalorizacao
            }
        })
        return patrimonio
    }


}

export default PatrimonioService
