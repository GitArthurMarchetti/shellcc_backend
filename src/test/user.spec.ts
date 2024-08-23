import { prisma } from '../../setupTest';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prismaClient from '../prisma';
import UserService from '../service/UserService'; 

// SE PRECISAR DE AJUDA PARA LER, VÁ NO README.md na parte de: "## Entenda os testes!"

function sum(a, b){
    a + b;
}

describe("Initial Test", () => {
    it("First Unit Test", () => {

        const firstArgument = 7;
        const secondArgument = 1;

        let results = sum(firstArgument, secondArgument);

        expect(results).toEqual(firstArgument + secondArgument)

    })
})