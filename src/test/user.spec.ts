import UserController from '../controller/UserController';
import UserService from '../service/UserService';
import { FastifyReply, FastifyRequest } from 'fastify';

jest.mock('../service/UserService');
const mockCreateUser = jest.fn();

UserService.prototype.createUser = mockCreateUser;
jest.mock('../service/UserService');
const mockGetUser = jest.fn();

UserService.prototype.getUser = mockGetUser;

describe("User Controller", () => {
    test("Deve criar usuário com sucesso", async () => {
        mockCreateUser.mockResolvedValue({
            user: { nome: "Arthur", email: "arthur505@gmail.com" },
            token: "some-token"
        });

        const request = {
            body: {
                nome: "Arthur",
                senha: "5050ABC",
                email: "arthur505@gmail.com"
            }
        } as Partial<FastifyRequest>;

        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<FastifyReply>;

        const userController = new UserController();

        await userController.createUser(request as FastifyRequest, reply as FastifyReply);

        expect(mockCreateUser).toHaveBeenCalledTimes(1);
        expect(reply.code).toHaveBeenCalledWith(200);
        expect(reply.code).toHaveBeenCalledWith(200);
    });

    test("Deve pegar todos os usuários", async () => {
        // Simula a resposta do método getUser do UserService
        mockGetUser.mockResolvedValue([
            { nome: "Arthur", email: "arthur505@gmail.com" },
            { nome: "Sarah", email: "sarah505@gmail.com" }
        ]);

        // Mock do objeto request
        const request = {} as Partial<FastifyRequest>;

        // Mock do objeto reply
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;

        // Instância do UserController
        const userController = new UserController();

        // Chama o método getUser
        await userController.getUser(request as FastifyRequest, reply as FastifyReply);

        // Verifica se o método getUser do UserService foi chamado
        expect(mockGetUser).toHaveBeenCalledTimes(1);
        
        // Verifica se o método send foi chamado com a lista de usuários
        expect(reply.send).toHaveBeenCalledWith([
            { nome: "Arthur", email: "arthur505@gmail.com" },
            { nome: "Sarah", email: "sarah505@gmail.com" }
        ]);
    });


}
);
