import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "@/use-cases/register";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "elias alexandre",
      email: "elias@alexandre.com",
      password: "87654321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "elias alexandre",
      email: "elias@alexandre.com",
      password: "87654321",
    });

    const isPasswordCorrectlyHashed = await compare(
      "87654321",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });

  it("should no be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "elias@alexandre.com";

    await registerUseCase.execute({
      email,
      name: "elias alexandre",
      password: "87654321",
    });

    expect(() =>
      registerUseCase.execute({
        email,
        name: "luis alexandre",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
