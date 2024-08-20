import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from 'bcrypt';
import prismaClient from "../prisma";
import GastoService from "../service/GastoService";

class GastoController {

    async createGasto(request: FastifyRequest, reply: FastifyReply) {
        const gastoService = new GastoService()
        const { titulo, descricao, preco, dataGasto, repeticao } = request.body as ({ titulo: string, descricao: string, preco: number, dataGasto: Date, repeticao: boolean })

        try {
            const { gasto } = await gastoService.createGasto({ titulo, descricao, preco, dataGasto, repeticao })
            reply.send({ gasto })
        } catch {
            reply.send({ error: "Ocorreu um erro ao criar o gasto" });
        }
    }

    async getGasto(request: FastifyRequest, reply: FastifyReply) {
        const gastoService = new GastoService()

        const gastos = await gastoService.getGasto()

        reply.send(gastos)

    }

    async updateGasto(request: FastifyRequest, reply: FastifyReply) {
        const gastoService = new GastoService()
        const { titulo, descricao, preco, dataGasto, repeticao } = request.body as ({ titulo: string, descricao: string, preco: number, dataGasto: Date, repeticao: boolean })

        try {
            const gasto = await gastoService.updateGasto({ titulo, descricao, preco, dataGasto, repeticao });

            reply.send({ gasto });
        } catch (error) {
            reply.send({ error: "Ocorreu um erro ao atualizar os detalhes do gasto" });
        }
    }

    async deleteGasto(request: FastifyRequest, reply: FastifyReply) {
        const gastoService = new GastoService()

        const { id } = request.body as { id: string }

        const gasto = await gastoService.deletarGasto(id)

        reply.send(gasto)
    }

}
export default GastoController;