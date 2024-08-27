import { FastifyReply, FastifyRequest } from 'fastify';
import * as jwt from 'jsonwebtoken';

async function authenticateJWT(request: FastifyRequest, reply: FastifyReply, done: Function) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        reply.status(401).send({ message: "Token não fornecido" });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = jwt.verify(token, 'your-secret-key');
        request.user = user;  // Agora o TypeScript sabe que `user` pode ser adicionado ao request
        done();  // Permite que a requisição continue
    } catch (error) {
        reply.status(403).send({ message: "Token inválido" });
    }
}

export default authenticateJWT;
