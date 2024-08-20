import { FastifyReply, FastifyRequest } from "fastify";
import PatrimonioService from "../service/PatrimonioService";
import bcrypt from 'bcrypt';
import prismaClient from "../prisma";

class PatrimonioController {

    async createPatrimonio(request: FastifyRequest, reply: FastifyReply) {
        const patrimonioService = new PatrimonioService()
        const { tituloPatrimonio, descricaoPatrimonio, codigo, valorDaAquisicao, valorFinal, valorAtual, situacao, localizacao } = request.body as ({ tituloPatrimonio: string, descricaoPatrimonio: string, codigo: number, valorDaAquisicao: number, valorFinal: number, valorAtual: number, situacao: number, localizacao: string })

        try {
            const { patrimonio } = await patrimonioService.createPatrimonio({ tituloPatrimonio, descricaoPatrimonio, codigo, valorDaAquisicao, valorFinal, valorAtual, situacao, localizacao })
            reply.send({ patrimonio })
        } catch {
            reply.send({ error: "Ocorreu um erro ao criar o patrimônio" });
        }
    }

    async getPatrimonio(request: FastifyRequest, reply: FastifyReply) {
        const patrimonioService = new PatrimonioService()

        const patrimonio = await patrimonioService.getPatrimonio()

        reply.send(patrimonio)

    }

    async updatePatrimonio(request: FastifyRequest, reply: FastifyReply) {
        const patrimonioService = new PatrimonioService()
        const { tituloPatrimonio, descricaoPatrimonio, codigo, valorDaAquisicao, valorFinal, valorAtual, situacao, localizacao } = request.body as ({ tituloPatrimonio: string, descricaoPatrimonio: string, codigo: number, valorDaAquisicao: number, valorFinal: number, valorAtual: number, situacao: number, localizacao: string })

        try {
            const patrimonio = await patrimonioService.updatePatrimonio({ tituloPatrimonio, descricaoPatrimonio, codigo, valorDaAquisicao, valorFinal, valorAtual, situacao, localizacao });

            reply.send({ patrimonio });
        } catch (error) {
            reply.send({ error: "Ocorreu um erro ao atualizar os detalhes do patrimônio" });
        }
    }

    async deletePatrimonio(request: FastifyRequest, reply: FastifyReply) {
        const patrimonioService = new PatrimonioService()

        const { id } = request.body as { id: string }

        const patrimonio = await patrimonioService.deletarPatrimonio(id)

        reply.send(patrimonio)
    }

}
export default PatrimonioController;