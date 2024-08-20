import prismaClient from '../prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

interface CategoriaProps {
    id?: string;
    tituloCategoria: string;
    descricaoCategoria?: string;
    TipoCategoria: string;
}

class CategoriaService {

    async createCategoria({ tituloCategoria, descricaoCategoria, TipoCategoria }: CategoriaProps) {
        if (!tituloCategoria || TipoCategoria === undefined) {
            throw new Error("Título da categoria e desvalorização são obrigatórios!");
        }

        try {
            const categoria = await prismaClient.categoria.create({
                data: {
                    tituloCategoria,
                    descricaoCategoria,
                    TipoCategoria
                }
            });
            return { categoria };
        } catch (error) {
            throw new Error("Erro ao criar categoria: " + error.message);
        }
    }

    async getCategorias() {
        try {
            const categorias = await prismaClient.categoria.findMany();
            return categorias;
        } catch (error) {
            throw new Error("Erro ao buscar categorias: " + error.message);
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

    async updateCategoria({ id, tituloCategoria, descricaoCategoria, TipoCategoria }: CategoriaProps) {
        if (!id || !tituloCategoria || TipoCategoria === undefined) {
            throw new Error("ID, título da categoria e desvalorização são obrigatórios!");
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
                tituloCategoria,
                descricaoCategoria,
                TipoCategoria
            }
        });

        return updatedCategoria;
    }
}

export default CategoriaService;
