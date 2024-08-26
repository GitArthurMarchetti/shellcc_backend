import GastoController from '../controller/GastoController';
import GastoService from '../service/GastoService';
import { FastifyReply, FastifyRequest } from 'fastify';

jest.mock('../service/GastoService');

// Mock dos métodos do GastoService
const mockCreateGasto = jest.fn();
GastoService.prototype.createGasto = mockCreateGasto;

const mockGetGasto = jest.fn();
GastoService.prototype.getGasto = mockGetGasto;

const mockUpdateGasto = jest.fn();
GastoService.prototype.updateGasto = mockUpdateGasto;

const mockDeleteGasto = jest.fn();
GastoService.prototype.deletarGasto = mockDeleteGasto;

describe("Gasto Controller", () => {

    // TESTE DE CRIAR GASTO -----------------------------------------------------------------------------------
    test("GASTO CREATE", async () => {
        const gastoController = new GastoController();

        mockCreateGasto.mockResolvedValue({
            gasto: {
                titulo: "Manutenção",
                descricao: "Manutenção no monitor",
                preco: 1500,
                dataGasto: new Date(),
                repeticao: true },
        });

        // Mock do REQUEST
        const request = {
            body: {
                titulo: "Manutenção",
                descricao: "Manutenção no monitor",
                preco: 1500,
                dataGasto: new Date(),
                repeticao: true
            }
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;

        await gastoController.createGasto(request as FastifyRequest, reply as FastifyReply);

        expect(mockCreateGasto).toHaveBeenCalledTimes(1);
        expect(reply.send).toHaveBeenCalledWith({
            gasto: {
                titulo: "Manutenção",
                descricao: "Manutenção no monitor",
                preco: 1500,
                dataGasto: expect.any(Date),
                repeticao: true
            }
        });
    });

    // TESTE DE GET GASTO -----------------------------------------------------------------------------------
    test("GASTO GET", async () => {
        const gastoController = new GastoController();

        // Mock do REQUEST
        const request = {} as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;

        mockGetGasto.mockResolvedValue([
            { titulo: "Manutenção", descricao: "Manutenção no monitor", preco: 1500, dataGasto: new Date(), repeticao: true },
            { titulo: "Internet", descricao: "Mensalidade do provedor", preco: 100, dataGasto: new Date(), repeticao: true }
        ]);

        await gastoController.getGasto(request as FastifyRequest, reply as FastifyReply);

        expect(mockGetGasto).toHaveBeenCalledTimes(1);
        expect(reply.send).toHaveBeenCalledWith([
            { titulo: "Manutenção", descricao: "Manutenção no monitor", preco: 1500, dataGasto: expect.any(Date), repeticao: true },
            { titulo: "Internet", descricao: "Mensalidade do provedor", preco: 100, dataGasto: expect.any(Date), repeticao: true }
        ]);
    });

    // TESTE DE ATUALIZAR GASTO -----------------------------------------------------------------------------------
    test("GASTO UPDATE", async () => {
        const gastoController = new GastoController();

        // Mock do REQUEST
        const request = {
            body: {
                titulo: "Manutenção",
                descricao: "Manutenção no monitor",
                preco: 1500,
                dataGasto: new Date(),
                repeticao: true
            }
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;

        mockUpdateGasto.mockResolvedValue({
            titulo: "Manutenção",
            descricao: "Manutenção no monitor - Atualizado",
            preco: 1600,
            dataGasto: new Date(),
            repeticao: true
        });

        await gastoController.updateGasto(request as FastifyRequest, reply as FastifyReply);

        expect(mockUpdateGasto).toHaveBeenCalledTimes(1);
        expect(mockUpdateGasto).toHaveBeenCalledWith({
            titulo: "Manutenção",
            descricao: "Manutenção no monitor",
            preco: 1500,
            dataGasto: expect.any(Date),
            repeticao: true
        });
        expect(reply.send).toHaveBeenCalledWith({
            gasto: {
                titulo: "Manutenção",
                descricao: "Manutenção no monitor - Atualizado",
                preco: 1600,
                dataGasto: expect.any(Date),
                repeticao: true
            }
        });
    });

    // TESTE DE DELETAR GASTO -----------------------------------------------------------------------------------
    test("GASTO DELETE", async () => {
        const gastoController = new GastoController();

        // Mock do REQUEST
        const request = {
            body: {
                id: "123"
            }
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;

        mockDeleteGasto.mockResolvedValue({
            id: "123",
            titulo: "Manutenção",
            descricao: "Manutenção no monitor",
            preco: 1500,
            dataGasto: new Date(),
            repeticao: true
        });

        await gastoController.deleteUser(request as FastifyRequest, reply as FastifyReply);

        expect(mockDeleteGasto).toHaveBeenCalledTimes(1);
        expect(mockDeleteGasto).toHaveBeenCalledWith("123");

        expect(reply.send).toHaveBeenCalledWith({
            id: "123",
            titulo: "Manutenção",
            descricao: "Manutenção no monitor",
            preco: 1500,
            dataGasto: expect.any(Date),
            repeticao: true
        });
    });
});
