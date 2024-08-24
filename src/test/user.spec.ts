import UserController from '../controller/UserController';
import UserService from '../service/UserService';
import { FastifyReply, FastifyRequest } from 'fastify';

jest.mock('../service/UserService');

import prismaClient from '../prisma';
import * as bcrypt from 'bcrypt';

// Mock do prismaClient para o login
jest.mock('../prisma', () => ({
    user: {
        findUnique: jest.fn(),
    }
}));

// Mock do bcrypt para o login
jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

//MOCK DOS SERVICES 
const mockCreateUser = jest.fn();
UserService.prototype.createUser = mockCreateUser;

const mockGetUser = jest.fn();
UserService.prototype.getUser = mockGetUser;

const mockUpdateUser = jest.fn();
UserService.prototype.updateUser = mockUpdateUser;

const mockDeleteUser = jest.fn();
UserService.prototype.deletarUsuario = mockDeleteUser;

describe("User Controller", () => {

    // TESTE DE CRIAR USUARIO -----------------------------------------------------------------------------------
    test("USUARIO CREATE", async () => {
        const userController = new UserController();

        mockCreateUser.mockResolvedValue({
            user: { nome: "Arthur", email: "arthur505@gmail.com" },
            token: "some-token"
        });

        // esse é o mock do objeto REQUEST
        const request = {
            body: {
                nome: "Arthur",
                senha: "5050ABC",
                email: "arthur505@gmail.com"
            }
        } as Partial<FastifyRequest>;

        // esse é o mock do objeto REPLY
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<FastifyReply>;



        await userController.createUser(request as FastifyRequest, reply as FastifyReply);

        expect(mockCreateUser).toHaveBeenCalledTimes(1);
        expect(reply.code).toHaveBeenCalledWith(200);
        expect(reply.code).toHaveBeenCalledWith(200);
    });





    // ESSE É O TESTE DO GET USUARIO -----------------------------------------------------------------------------------
    test("USUARIO GET", async () => {
        const userController = new UserController();

        // esse é o mock do objeto REQUEST
        const request = {} as Partial<FastifyRequest>;

        // esse é o mock do objeto REPLY
        const reply = {
            send: jest.fn(),
        } as Partial<FastifyReply>;


        mockGetUser.mockResolvedValue([
            { nome: "Arthur", email: "arthur505@gmail.com" },
            { nome: "Borges", email: "borges505@gmail.com" }
        ]);

        await userController.getUser(request as FastifyRequest, reply as FastifyReply);

        expect(mockGetUser).toHaveBeenCalledTimes(1);

        expect(reply.send).toHaveBeenCalledWith([
            { nome: "Arthur", email: "arthur505@gmail.com" },
            { nome: "Borges", email: "borges505@gmail.com" }
        ]);
    });

    // TESTE DE ATUALIZAR USUARIO -----------------------------------------------------------------------------------
    test("USUARIO UPDATE", async () => {
        const userController = new UserController();

        // esse é o mock do objeto REQUEST
        const request = {
            body: {
                id: "123",
                nome: "Arthur",
                senha: "new-password",
                email: "arthur505@gmail.com"
            }
        } as Partial<FastifyRequest>;

        // esse é o mock do objeto REPLY
        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<FastifyReply>;

        mockUpdateUser.mockResolvedValue({
            id: "123",
            nome: "Arthur",
            email: "arthur505@gmail.com",
            senha: "new-password"
        });


        await userController.updateUser(request as FastifyRequest, reply as FastifyReply);

        expect(mockUpdateUser).toHaveBeenCalledTimes(1);
        expect(mockUpdateUser).toHaveBeenCalledWith({
            id: "123",
            nome: "Arthur",
            email: "arthur505@gmail.com",
            senha: "new-password"
        });
        expect(reply.send).toHaveBeenCalledWith({
            id: "123",
            nome: "Arthur",
            email: "arthur505@gmail.com",
            senha: "new-password"
        });
    })

    // TESTE DE DELETAR USUARIO -----------------------------------------------------------------------------------
    test("USUARIO DELETE", async () => {
        const userController = new UserController();

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

        mockDeleteUser.mockResolvedValue({
            id: "123",
            nome: "Arthur",
            email: "arthur505@gmail.com",
            senha: "new-password"
        });

        await userController.deleteUser(request as FastifyRequest, reply as FastifyReply);

        expect(mockDeleteUser).toHaveBeenCalledTimes(1);
        expect(mockDeleteUser).toHaveBeenCalledWith("123");

        expect(reply.send).toHaveBeenCalledWith({
            id: "123",
            nome: "Arthur",
            email: "arthur505@gmail.com",
            senha: "new-password"
        });
    });

    test("Deve logar usuário com sucesso", async () => {
        const userController = new UserController();

        // Mock do bcrypt.compare
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        // Mock do prismaClient.findUnique
        (prismaClient.user.findUnique as jest.Mock).mockResolvedValue({
            id: "123",
            email: "arthur505@gmail.com",
            senha: "hashed-password"
        });

        // Mock do REQUEST
        const request = {
            body: {
                email: "arthur505@gmail.com",
                senha: "plain-password"
            }
        } as Partial<FastifyRequest>;

        // Mock do REPLY
        const reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<FastifyReply>;

        await userController.login(request as FastifyRequest, reply as FastifyReply);

        expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
            where: { email: "arthur505@gmail.com" }
        });
        expect(bcrypt.compare).toHaveBeenCalledWith("plain-password", "hashed-password");
        expect(reply.status).not.toHaveBeenCalledWith(400); 
    });

}
);
