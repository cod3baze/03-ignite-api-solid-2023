import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

// SUT: System Under Test, A funcionalidade principal a ser testada.

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "elias alexandre",
      email: "elias@alexandre.com",
      password_hash: await hash("87654321", 3),
    });

    const { user } = await sut.execute({
      email: "elias@alexandre.com",
      password: "87654321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "elias@alexandre.co",
        password: "87654321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "elias alexandre",
      email: "elias@alexandre.com",
      password_hash: await hash("87654321", 3),
    });

    await expect(() =>
      sut.execute({
        email: "elias@alexandre.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
