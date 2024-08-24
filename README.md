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

Exemplo da simulação a resposta do método getUser do UserService:

 mockGetUser.mockResolvedValue([
            { nome: "Arthur", email: "arthur505@gmail.com" },
            { nome: "Sarah", email: "sarah505@gmail.com" }
        ]);