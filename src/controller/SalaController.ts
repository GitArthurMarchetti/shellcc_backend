import { FastifyReply, FastifyRequest } from "fastify";
import SalaService from "../service/SalaService";

class SalaController {
    async createSala(request: FastifyRequest, reply: FastifyReply) {
        const salaService = new SalaService();
        const { tituloSala, descricaoSala, cor, totalMembros, maximoDeMembros, tokkenAcesso, resetPasswordToken } = request.body as {
            tituloSala: string;
            descricaoSala: string;
            cor: string;
            totalMembros: number;
            maximoDeMembros: number;
            tokkenAcesso: string;
            resetPasswordToken: string;
        };

        try {
            const { sala } = await salaService.createSala({ tituloSala, descricaoSala, cor, totalMembros, maximoDeMembros, tokkenAcesso, resetPasswordToken });
            reply.send({ sala });
        } catch (error) {
            reply.send({ error: "Ocorreu um erro ao criar a sala" });
        }
    }

    async getSala(request: FastifyRequest, reply: FastifyReply) {
        const salaService = new SalaService();

        try {
            const salas = await salaService.getSala();
            reply.send(salas);
        } catch (error) {
            reply.send({ error: "Ocorreu um erro ao buscar as salas" });
        }
    }

    async updateSala(request: FastifyRequest, reply: FastifyReply) {
        const salaService = new SalaService();
        const { id, tituloSala, descricaoSala, cor, totalMembros, maximoDeMembros, tokkenAcesso, resetPasswordToken } = request.body as {
            id: string;
            tituloSala: string;
            descricaoSala: string;
            cor: string;
            totalMembros: number;
            maximoDeMembros: number;
            tokkenAcesso: string;
            resetPasswordToken: string;
        };

        try {
            const sala = await salaService.updateSala({ id, tituloSala, descricaoSala, cor, totalMembros, maximoDeMembros, tokkenAcesso, resetPasswordToken });
            reply.send({ sala });
        } catch (error) {
            reply.send({ error: "Ocorreu um erro ao atualizar os detalhes da sala" });
        }
    }

    async deleteSala(request: FastifyRequest, reply: FastifyReply) {
        const salaService = new SalaService();
        const { id } = request.body as { id: string };

        try {
            const result = await salaService.deletarSala(id);
            reply.send(result);
        } catch (error) {
            reply.send({ error: "Ocorreu um erro ao deletar a sala" });
        }
    }
}

export default SalaController;
