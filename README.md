# ANOTAÇÕES!

<!-- TESTE UNITÁRIO -->

## Entenda os testes com *JEST*!

### Principais funções: 

**- DESCRIBE:**

Declara para o Jest, onde começa o bloco de testes. Reune um conjunto de testes unitários. - *tests swites*

**- IT ou TEST:**

Declara um caso ÚNICO de teste unitário. - *tests cases*

**- EXPECT:**

Asserções do resultado - Valida os resultados


### O que é Mock?

**- Mock:**

'um mock é um objeto simulado que imita o comportamento de objetos reais de forma controlada.', ou seja, Mock é a simulação de uma entrada.

Exemplo da simulação a resposta do método getUsers do UserService:

 mockGetUser.mockResolvedValue([
            { nome: "Arthur", email: "arthur505@exemplo.com" },
            { nome: "Sarah", email: "borges505@exemplo.com" }
        ]);

**- Métodos importantes de MOCK:**

1. jest.fn():

  >  Cria uma função mock. Você pode usar essa função para verificar se foi chamada e com quais argumentos.

2. mockReturnValue(value):

  >  Define um valor fixo para ser retornado pela função mock quando ela é chamada.

3. mockResolvedValue(value):

  >  Define o valor que a promessa retornada pela função mock deve resolver. Usado para simular funções assíncronas.

4. mockRejectedValue(value):

  >  Define o valor que a promessa retornada pela função mock deve rejeitar. Usado para simular erros em funções assíncronas.

5. mockImplementation(fn):

  >  Substitui a implementação padrão da função mock com uma função personalizada fornecida. Pode ser usado para simular comportamentos específicos.

6. mockClear():

  >  Limpa o histórico de chamadas e as informações associadas a uma função mock, mas não a substitui.

7. mockReset():

  >  Reseta o estado de uma função mock, removendo todos os registros de chamadas e implementações

8. mockRestore():

  >  Restaura a implementação original de uma função após ter sido mockada.