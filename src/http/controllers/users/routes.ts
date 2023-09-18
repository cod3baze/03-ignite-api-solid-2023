import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middleware/verify-jwt";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /** Only authenticated user */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
