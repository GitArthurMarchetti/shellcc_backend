import prismaClient from '../prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

interface CategoriaProps {
    id?: string;
    tipoCategoria: string;
    descricaoCategoria?: string;
    porcentagemDepreciacaoCategoria: string;
}

class CategoriaService {

    async createCategoria({ tipoCategoria, descricaoCategoria, porcentagemDepreciacaoCategoria }: CategoriaProps) {
        if (tipoCategoria === undefined) {
            throw new Error("Título da categoria e desvalorização são obrigatórios!");
        }

        try {
            const categoria = await prismaClient.categoria.create({
                data: {
                    tipoCategoria,
                    descricaoCategoria,
                    porcentagemDepreciacaoCategoria
                }
            });
            return { categoria };
        } catch (error) {
            throw new Error("Erro ao criar categoria: ");
        }
    }

    async getCategorias() {
        try {
            const categorias = await prismaClient.categoria.findMany();
            return categorias;
        } catch (error) {
            throw new Error("Erro ao buscar categorias: ");
        }
    }

    async getCategoriaById(id: string) {
        if (!id) {
            throw new Error("ID da categoria é obrigatório!");
        }

        const categoria = await prismaClient.categoria.findUnique({
            where: { id }
        });

        if (!categoria) {
            throw new Error("Categoria não encontrada!");
        }

        return categoria;
    }

    async deleteCategoria(id: string) {
        if (!id) {
            throw new Error("ID da categoria é obrigatório!");
        }

        const categoria = await prismaClient.categoria.findUnique({
            where: { id }
        });

        if (!categoria) {
            throw new Error("Categoria não encontrada!");
        }

        await prismaClient.categoria.delete({
            where: { id }
        });

        return { message: 'Categoria deletada' };
    }

    async updateCategoria({ id, tipoCategoria, descricaoCategoria }: CategoriaProps) {
        if (!id || !tipoCategoria === undefined) {
            throw new Error("ID, tipo da categoria e desvalorização são obrigatórios!");
        }

        const categoria = await prismaClient.categoria.findUnique({
            where: { id }
        });

        if (!categoria) {
            throw new Error("Categoria não encontrada!");
        }

        const updatedCategoria = await prismaClient.categoria.update({
            where: { id },
            data: {
                tipoCategoria,
                descricaoCategoria
            }
        });

        return updatedCategoria;
    }
}

export default CategoriaService;
