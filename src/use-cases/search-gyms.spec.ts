import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: "Smart Academy Gym",
      phone: "+55 000-00-000",
      latitude: 87654321,
      logitude: 87654321,
    });
    await gymsRepository.create({
      title: "TypeScript Gym",
      description: "Smart Academy Gym",
      phone: "+55 000-00-000",
      latitude: 87654321,
      logitude: 87654321,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms", async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `Dev Gym ${index}`,
        description: `Smart dev Academy Gym ${index}`,
        phone: "+55 000-00-000",
        latitude: 87654321,
        logitude: 87654321,
      });
    }

    const { gyms } = await sut.execute({
      query: "Dev Gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Dev Gym 21" }),
      expect.objectContaining({ title: "Dev Gym 22" }),
    ]);
  });
});
