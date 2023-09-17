import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  console.log(request.user);
  // try {
  //   const authenticateUseCase = makeAuthenticateUseCase();

  //   await authenticateUseCase.execute({ email, password });
  // } catch (error: any) {
  //   if (error instanceof InvalidCredentialsError) {
  //     return reply.status(400).send({ message: error.message });
  //   }

  //   throw error;
  // }

  return reply.status(200).send();
}
