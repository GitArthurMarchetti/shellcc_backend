import PatrimonioService from '../service/SalaService';
import SalaController from '../controller/SalaController';
import SalaService from '../service/SalaService';
import { FastifyReply, FastifyRequest } from 'fastify';
import PatrimonioController from '../controller/PatrimonioController';

jest.mock('../service/SalaService');

const reply = {
    code: jest.fn().mockReturnThis(),
    send: jest.fn(),
} as Partial<FastifyReply>;


// Mock dos métodos do SalaService
const mockCreateSala = jest.fn();
SalaService.prototype.createSala = mockCreateSala;

const mockGetSala = jest.fn();
SalaService.prototype.getSala = mockGetSala;

const mockUpdateSala = jest.fn();
SalaService.prototype.updateSala = mockUpdateSala;

const mockDeleteSala = jest.fn();
SalaService.prototype.deletarSala = mockDeleteSala;

describe("Sala Controller", () => {

    // TESTE DE CRIAR GASTO -----------------------------------------------------------------------------------
    test("SALA CREATE", async () => {
        const salaController = new SalaController();
        mockCreateSala.mockResolvedValue({
            sala: {
                id: "1",
                tituloSala: "SENAI",
                descricaoSala: "Mensalidade do apartamento",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 20,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            },
        });

        // Mock do REQUEST
        const request = {
            body: {
                id: "1",
                tituloSala: "SENAI",
                descricaoSala: "Mensalidade do apartamento",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 20,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            }
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            send: jest.fn(),
            code: jest.fn().mockReturnThis(),
        } as Partial<FastifyReply>;

        await salaController.createSala(request as FastifyRequest, reply as FastifyReply);

        expect(mockCreateSala).toHaveBeenCalledTimes(1);
        expect(reply.send).toHaveBeenCalledWith({
            sala: {
                id: "1",
                tituloSala: "SENAI",
                descricaoSala: "Mensalidade do apartamento",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 20,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            }
        });
    });

    // TESTE DE GET PATRIMONIO -----------------------------------------------------------------------------------
    test("SALA GET", async () => {
        const salaController = new SalaController();

        // Mock do REQUEST
        const request = {} as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<FastifyReply>;

        mockGetSala.mockResolvedValue([
            {
                id: "1",
                tituloSala: "SENAI",
                descricaoSala: "Mensalidade do apartamento",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 20,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            },
            {
                id: "1",
                tituloSala: "SENAI",
                descricaoSala: "Mensalidade do apartamento",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 20,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            }
        ]);

        await salaController.getSala(request as FastifyRequest, reply as FastifyReply);

        expect(mockGetSala).toHaveBeenCalledTimes(1);
        expect(reply.send).toHaveBeenCalledWith([
            {
                id: "1",
                tituloSala: "SENAI",
                descricaoSala: "Mensalidade do apartamento",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 20,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            },
            {
                id: "1",
                tituloSala: "SENAI",
                descricaoSala: "Mensalidade do apartamento",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 20,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            }
        ]);
    });

    // TESTE DE ATUALIZAR SALA -----------------------------------------------------------------------------------
    test("SALA UPDATE", async () => {
        const salaController = new SalaController();

        // Mock do REQUEST
        const request = {
            body: {
                id: "1",
                tituloSala: "Novo SENAI",
                descricaoSala: "Novo senai",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 20,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            }
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<FastifyReply>;

        // Configura o mock do updateSala para retornar valores específicos
        mockUpdateSala.mockResolvedValue({
            id: "1",
            tituloSala: "SENAI antigo",
            descricaoSala: "senai antigo",
            cor: "Azul",
            totalMembros: 15,
            maximoDeMembros: 2,
            tokkenAcesso: "abc123",
            resetPasswordToken: 'abc1234',
        });

        // Executa o método updateSala do controlador
        await salaController.updateSala(request as FastifyRequest, reply as FastifyReply);

        // Verifica se o mockUpdateSala foi chamado corretamente
        expect(mockUpdateSala).toHaveBeenCalledTimes(1);
        expect(mockUpdateSala).toHaveBeenCalledWith({
            id: "1",
            tituloSala: "Novo SENAI",
            descricaoSala: "Novo senai",
            cor: "Azul",
            totalMembros: 15,
            maximoDeMembros: 20,
            tokkenAcesso: "abc123",
            resetPasswordToken: 'abc1234',
        });

        // Verifica se o método reply.send foi chamado com o valor correto
        expect(reply.send).toHaveBeenCalledWith({
            sala: {
                id: "1",
                tituloSala: "SENAI antigo",
                descricaoSala: "senai antigo",
                cor: "Azul",
                totalMembros: 15,
                maximoDeMembros: 2,
                tokkenAcesso: "abc123",
                resetPasswordToken: 'abc1234',
            }
        });
    });
    // TESTE DE DELETAR SALA -----------------------------------------------------------------------------------
    test("SALA DELETE", async () => {
        const salaController = new SalaController();

        // Mock do REQUEST
        const request = {
            body: { id: "123" } // Mudança de params para body, conforme a necessidade do controlador
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<FastifyReply>;

        mockDeleteSala.mockResolvedValue({
            id: "1",
            tituloSala: "Novo SENAI",
            descricaoSala: "Novo senai",
            cor: "Azul",
            totalMembros: 15,
            maximoDeMembros: 20,
            tokkenAcesso: "abc123",
            resetPasswordToken: 'abc1234',
        });

        await salaController.deleteSala(request as FastifyRequest, reply as FastifyReply);

        expect(mockDeleteSala).toHaveBeenCalledTimes(1);
        expect(mockDeleteSala).toHaveBeenCalledWith("1");

        expect(reply.send).toHaveBeenCalledWith({
            id: "1",
            tituloSala: "Novo SENAI",
            descricaoSala: "Novo senai",
            cor: "Azul",
            totalMembros: 15,
            maximoDeMembros: 20,
            tokkenAcesso: "abc123",
            resetPasswordToken: 'abc1234',
        });
    });
});
