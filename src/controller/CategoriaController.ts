import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from 'bcrypt';
import prismaClient from "../prisma";
import GastoService from "../service/CategoriaService";
import CategoriaService from "../service/CategoriaService";

class CategoriaController {

    async createCategoria(request: FastifyRequest, reply: FastifyReply) {
        const categoriaService = new CategoriaService()
        const {
            tipoCategoria,
            descricaoCategoria,
            porcentagemDepreciacaoCategoria
        } = request.body as ({
                tipoCategoria: string,
                descricaoCategoria: string,
                porcentagemDepreciacaoCategoria: string,
            })

        try {
            const { categoria } = await categoriaService.createCategoria({
            tipoCategoria,
            descricaoCategoria,
            porcentagemDepreciacaoCategoria
            })
            reply.send({ categoria })
        } catch {
            reply.send({ error: "Ocorreu um erro ao criar a categoria" });
        }
    }

    async getCategoria(request: FastifyRequest, reply: FastifyReply) {
        const categoriaService = new CategoriaService()

        const categorias = await categoriaService.getCategorias()

        reply.send(categorias)

    }

    async updateCategoria(request: FastifyRequest, reply: FastifyReply) {
        const categoriaService = new CategoriaService()
        const {  
            descricaoCategoria,
            tipoCategoria,
            porcentagemDepreciacaoCategoria
         } = request.body as ({ 
                tipoCategoria: string,
                descricaoCategoria: string,
                porcentagemDepreciacaoCategoria: string
                })

        try {
            const categoria = await categoriaService.updateCategoria({
                tipoCategoria,
                descricaoCategoria,
                porcentagemDepreciacaoCategoria
          });

            reply.send({ categoria });
        } catch (error) {
            reply.send({ error: "Ocorreu um erro ao atualizar os detalhes da categoria" });
        }
    }

    async deleteCategoria(request: FastifyRequest, reply: FastifyReply) {
        const categoriaService = new CategoriaService()

        const { id } = request.body as { id: string }

        const categoria = await categoriaService.deleteCategoria(id)

        reply.send(categoria)
    }

}
export default CategoriaController;