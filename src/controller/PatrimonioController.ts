import { FastifyReply, FastifyRequest } from "fastify";
import PatrimonioService from "../service/PatrimonioService";

class PatrimonioController {

    async createPatrimonio(request: FastifyRequest, reply: FastifyReply) {
        const patrimonioService = new PatrimonioService();
        const {
            tituloPatrimonio,
            descricaoPatrimonio,
            codigo,
            valorDaAquisicao,
            valorFinal,
            valorAtual,
            situacao,
            localizacao,
            porcentagemDesvalorizacao
        } = request.body as ({
            tituloPatrimonio: string;
            descricaoPatrimonio?: string;
            codigo: number;
            valorDaAquisicao: number;
            valorFinal: number;
            valorAtual: number;
            situacao: number;
            localizacao: string;
            porcentagemDesvalorizacao: number;
        });

        try {
            const patrimonio = await patrimonioService.createPatrimonio({
                tituloPatrimonio,
                descricaoPatrimonio,
                codigo,
                valorDaAquisicao,
                valorFinal,
                valorAtual,
                situacao,
                localizacao,
                porcentagemDesvalorizacao
            });
            reply.code(200).send(patrimonio);
        } catch (error) {
            reply.code(500).send({ error: "Ocorreu um erro ao criar o patrimônio: " + (error as Error).message });
        }
    }

    async getPatrimonio(request: FastifyRequest, reply: FastifyReply) {
        const patrimonioService = new PatrimonioService();

        try {
            const patrimonios = await patrimonioService.getPatrimonio();
            reply.send(patrimonios);
        } catch (error) {
            reply.code(500).send({ error: "Ocorreu um erro ao buscar os patrimonios: " + (error as Error).message });
        }
    }

    async updatePatrimonio(request: FastifyRequest, reply: FastifyReply) {
        const patrimonioService = new PatrimonioService();
        const {
            id,
            tituloPatrimonio,
            descricaoPatrimonio,
            codigo,
            valorDaAquisicao,
            valorFinal,
            valorAtual,
            situacao,
            localizacao,
            porcentagemDesvalorizacao
        } = request.body as ({
            id: string;
            tituloPatrimonio: string;
            descricaoPatrimonio?: string;
            codigo: number;
            valorDaAquisicao: number;
            valorFinal: number;
            valorAtual: number;
            situacao: number;
            localizacao: string;
            porcentagemDesvalorizacao: number;
        });

        if (!id) {
            reply.code(400).send({ error: "ID não fornecido" });
            return;
        }

        try {
            const patrimonio = await patrimonioService.updatePatrimonio({
                id,
                tituloPatrimonio,
                descricaoPatrimonio,
                codigo,
                valorDaAquisicao,
                valorFinal,
                valorAtual,
                situacao,
                localizacao,
                porcentagemDesvalorizacao
            });
            reply.send(patrimonio);
        } catch (error) {
            reply.code(500).send({ error: "Ocorreu um erro ao atualizar o patrimônio: " + (error as Error).message });
        }
    }

    async deletePatrimonio(request: FastifyRequest, reply: FastifyReply) {
        const patrimonioService = new PatrimonioService();
        const { id } = request.body as { id: string };

        if (!id) {
            reply.status(400).send({ error: "ID não fornecido" });
            return;
        }

        try {
            const resultado = await patrimonioService.deletarPatrimonio(id);
            reply.send(resultado);
        } catch (error) {
            reply.code(500).send({ error: "Ocorreu um erro ao deletar o patrimônio: " + (error as Error).message });
        }
    }
}

export default PatrimonioController;
