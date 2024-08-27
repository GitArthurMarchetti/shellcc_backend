import PatrimonioController from '../controller/CategoriaController';
import CategoriaController from '../controller/CategoriaController'
import CategoriaService from '../service/CategoriaService';
import { FastifyReply, FastifyRequest } from 'fastify';

jest.mock('../service/CategoriaService');

// Mock dos métodos do CategoriaService
const mockCreateCategoria = jest.fn();
CategoriaService.prototype.createCategoria = mockCreateCategoria;

const mockGetCategoria = jest.fn();
CategoriaService.prototype.getCategorias = mockGetCategoria;

const mockUpdateCategoria = jest.fn();
CategoriaService.prototype.updateCategoria = mockUpdateCategoria;

const mockDeleteCategoria = jest.fn();
CategoriaService.prototype.deleteCategoria = mockDeleteCategoria;

describe("Categoria Controller", () => {

    // TESTE DE CRIAR GASTO -----------------------------------------------------------------------------------
    test("CATEGORIA CREATE", async () => {
        const categoriaController = new CategoriaController();

        mockCreateCategoria.mockResolvedValue({
            categoria: {
                tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais',
            },
        });

        // Mock do REQUEST
        const request = {
            body: {
                tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais',
            }
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;

        await categoriaController.createCategoria(request as FastifyRequest, reply as FastifyReply);

        expect(mockCreateCategoria).toHaveBeenCalledTimes(1);
        expect(reply.send).toHaveBeenCalledWith({
            categoria: {
                tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais',
            }
        });
    });

    // TESTE DE GET CATEGORIA -----------------------------------------------------------------------------------
    test("CATEGORIA GET", async () => {
        const categoriaController = new CategoriaController();

        // Mock do REQUEST
        const request = {} as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;

        mockGetCategoria.mockResolvedValue([
            {  
                tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais', },
            {    tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais', }
        ]);

        await categoriaController.getCategoria(request as FastifyRequest, reply as FastifyReply);

        expect(mockGetCategoria).toHaveBeenCalledTimes(1);
        expect(reply.send).toHaveBeenCalledWith([
            {    tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais', },
            {   tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais',}
        ]);
    });

    // TESTE DE ATUALIZAR GASTO -----------------------------------------------------------------------------------
    test("CATEGORIA UPDATE", async () => {
        const categoriaController = new PatrimonioController();

        // Mock do REQUEST
        const request = {
            body: {
                tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais',
            }
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;

        mockUpdateCategoria.mockResolvedValue({
            tipoCategoria: "computadores",
            descricaoCategoria: 'São computadores legais - Atualizado',
        });

        await categoriaController.updateCategoria(request as FastifyRequest, reply as FastifyReply);

        expect(mockUpdateCategoria).toHaveBeenCalledTimes(1);
        expect(mockUpdateCategoria).toHaveBeenCalledWith({
            tipoCategoria: "computadores",
            descricaoCategoria: 'São computadores legais',
        });
        expect(reply.send).toHaveBeenCalledWith({
            categoria: {
                tipoCategoria: "computadores",
                descricaoCategoria: 'São computadores legais - Atualizado',
            }
        });
    });

     // TESTE DE DELETAR CATEGORIA -----------------------------------------------------------------------------------
test("CATEGORIA DELETE", async () => {
    const categoriaController = new CategoriaController();

    // Mock do REQUEST
    const request = {
        body: {
            id: "1"
        }
    } as Partial<FastifyRequest>;

    // Mock do REPLY
    const reply = {
        send: jest.fn(),
    } as Partial<FastifyReply>;

    mockDeleteCategoria.mockResolvedValue({
        id: "1",
        tipoCategoria: "computadores",
        descricaoCategoria: 'São computadores legais - Atualizado',
    });

    await categoriaController.deleteCategoria(request as FastifyRequest, reply as FastifyReply);

    expect(mockDeleteCategoria).toHaveBeenCalledTimes(1);
    expect(mockDeleteCategoria).toHaveBeenCalledWith("1");

    expect(reply.send).toHaveBeenCalledWith({
        id: "1",  // Include the 'id' field here
        tipoCategoria: "computadores",
        descricaoCategoria: 'São computadores legais - Atualizado',
    });
});
});
