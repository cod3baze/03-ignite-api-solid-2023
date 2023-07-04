import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a Gym", async () => {
    const { gym } = await sut.execute({
      title: "Éfit Gym",
      description: "Smart Academy Gym",
      phone: "+55 000-00-000",
      latitude: 87654321,
      longitude: 87654321,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
