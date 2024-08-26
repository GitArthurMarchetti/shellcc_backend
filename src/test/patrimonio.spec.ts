    import PatrimonioService from '../service/PatrimonioService';
    import GastoController from '../controller/GastoController';
    import GastoService from '../service/GastoService';
    import { FastifyReply, FastifyRequest } from 'fastify';
    import PatrimonioController from '../controller/PatrimonioController';

    jest.mock('../service/GastoService');

    const reply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn(),
    } as Partial<FastifyReply>;


    // Mock dos métodos do PatrimonioService
    const mockCreatePatrimonio = jest.fn();
    PatrimonioService.prototype.createPatrimonio = mockCreatePatrimonio;

    const mockGetPatrimonio = jest.fn();
    PatrimonioService.prototype.getPatrimonio = mockGetPatrimonio;

    const mockUpdatePatrimonio = jest.fn();
    PatrimonioService.prototype.updatePatrimonio = mockUpdatePatrimonio;

    const mockDeletePatrimonio = jest.fn();
    PatrimonioService.prototype.deletarPatrimonio = mockDeletePatrimonio;

    describe("Patrimonio Controller", () => {

        // TESTE DE CRIAR GASTO -----------------------------------------------------------------------------------
        test("PATRIMONIO CREATE", async () => {
            const patrimonioController = new PatrimonioController();
            mockCreatePatrimonio.mockResolvedValue({
                patrimonio: {
                    id: "123",
                    tituloPatrimonio: "Aluguel", 
                    descricaoPatrimonio: "Mensalidade do apartamento",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 10',
                    porcentagemDesvalorizacao: 23,
                },
            });

            // Mock do REQUEST
            const request = {
                body: {
                    id: "123",
                    tituloPatrimonio: "Aluguel", 
                    descricaoPatrimonio: "Mensalidade do apartamento",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 10',
                    porcentagemDesvalorizacao: 23,
                }
            } as Partial<FastifyRequest>;

            // Mock do REPLY
            const reply = {
                send: jest.fn(),
                code: jest.fn().mockReturnThis(),
            } as Partial<FastifyReply>;

            await patrimonioController.createPatrimonio(request as FastifyRequest, reply as FastifyReply);

            expect(mockCreatePatrimonio).toHaveBeenCalledTimes(1);
            expect(reply.send).toHaveBeenCalledWith({
                patrimonio: {
                    id: "123",
                    tituloPatrimonio: "Aluguel", 
                    descricaoPatrimonio: "Mensalidade do apartamento",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 10',
                    porcentagemDesvalorizacao: 23,
                }
            });
        });

        // TESTE DE GET PATRIMONIO -----------------------------------------------------------------------------------
        test("PATRIMONIO GET", async () => {
            const patrimonioController = new PatrimonioController();

            // Mock do REQUEST
            const request = {} as Partial<FastifyRequest>;

            // Mock do REPLY
            const reply = {
                code: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as Partial<FastifyReply>;

            mockGetPatrimonio.mockResolvedValue([
                {  
                    tituloPatrimonio: "Aluguel", 
                    descricaoPatrimonio: "Mensalidade do apartamento",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 10',
                    porcentagemDesvalorizacao: 23, },
                { 
                    tituloPatrimonio: "Aluguel", 
                    descricaoPatrimonio: "Mensalidade do apartamento",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 10',
                    porcentagemDesvalorizacao: 23,}
            ]);

            await patrimonioController.getPatrimonio(request as FastifyRequest, reply as FastifyReply);

            expect(mockGetPatrimonio).toHaveBeenCalledTimes(1);
            expect(reply.send).toHaveBeenCalledWith([
                {  
                    tituloPatrimonio: "Aluguel", 
                    descricaoPatrimonio: "Mensalidade do apartamento",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 10',
                    porcentagemDesvalorizacao: 23, },
                {  
                    tituloPatrimonio: "Aluguel", 
                    descricaoPatrimonio: "Mensalidade do apartamento",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 10',
                    porcentagemDesvalorizacao: 23, }
            ]);
        });

        // TESTE DE ATUALIZAR PATRIMONIO -----------------------------------------------------------------------------------
        test("PATRIMONIO UPDATE", async () => {
            const patrimonioController = new PatrimonioController();

            // Mock do REQUEST
            const request = {
                body: {
                    id: "123",
                    tituloPatrimonio: "Nova", 
                    descricaoPatrimonio: "Nova",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 9',
                    porcentagemDesvalorizacao: 23
                }
            } as Partial<FastifyRequest>;

            // Mock do REPLY
            const reply = {
                code: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as Partial<FastifyReply>;

            mockUpdatePatrimonio.mockResolvedValue({
                id: "123",
                tituloPatrimonio: "Aluguel", 
                descricaoPatrimonio: "Mensalidade do apartamento",
                codigo: 1234567,
                valorDaAquisicao: 1500,    
                valorFinal: 100,
                valorAtual: 1000,
                situacao: 1,
                localizacao: 'Sala 9',
                porcentagemDesvalorizacao: 23
            });

            await patrimonioController.updatePatrimonio(request as FastifyRequest, reply as FastifyReply);

            expect(mockUpdatePatrimonio).toHaveBeenCalledTimes(1);
            expect(mockUpdatePatrimonio).toHaveBeenCalledWith({
                id: "123",
                    tituloPatrimonio: "Nova", 
                    descricaoPatrimonio: "Nova",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 9',
                    porcentagemDesvalorizacao: 23
            });
            expect(reply.send).toHaveBeenCalledWith({
                patrimonio: {
                    id: "123",
                    tituloPatrimonio: "Nova", 
                    descricaoPatrimonio: "Nova",
                    codigo: 1234567,
                    valorDaAquisicao: 1500,    
                    valorFinal: 100,
                    valorAtual: 1000,
                    situacao: 1,
                    localizacao: 'Sala 9',
                    porcentagemDesvalorizacao: 23
                }
            });
        });

        // TESTE DE DELETAR PATRIMONIO -----------------------------------------------------------------------------------
        test("PATRIMONIO DELETE", async () => {
            const patrimonioController = new PatrimonioController();
        
            // Mock do REQUEST
            const request = {
                body: { id: "123" } // Mudança de params para body, conforme a necessidade do controlador
            } as Partial<FastifyRequest>;
        
            // Mock do REPLY
            const reply = {
                code: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as Partial<FastifyReply>;
        
            mockDeletePatrimonio.mockResolvedValue({
                id: "123",
                tituloPatrimonio: "Aluguel", 
                descricaoPatrimonio: "Mensalidade do apartamento",
                codigo: 1234567,
                valorDaAquisicao: 1500,    
                valorFinal: 100,
                valorAtual: 1000,
                situacao: 1,
                localizacao: 'Sala 10',
                porcentagemDesvalorizacao: 23
            });
        
            await patrimonioController.deletePatrimonio(request as FastifyRequest, reply as FastifyReply);
        
            expect(mockDeletePatrimonio).toHaveBeenCalledTimes(1);
            expect(mockDeletePatrimonio).toHaveBeenCalledWith("123");
        
            expect(reply.send).toHaveBeenCalledWith({
                id: "123",
                tituloPatrimonio: "Aluguel", 
                descricaoPatrimonio: "Mensalidade do apartamento",
                codigo: 1234567,
                valorDaAquisicao: 1500,    
                valorFinal: 100,
                valorAtual: 1000,
                situacao: 1,
                localizacao: 'Sala 10',
                porcentagemDesvalorizacao: 23
            });
        });
    });
