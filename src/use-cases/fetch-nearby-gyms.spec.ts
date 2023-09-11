import { beforeEach, describe, expect, it } from "vitest";
import { Decimal } from "@prisma/client/runtime";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: "Smart Academy Gym",
      phone: "+55 000-00-000",
      latitude: new Decimal(-8.863744),
      logitude: new Decimal(13.254656),
    });
    await gymsRepository.create({
      title: "Far Gym",
      description: "Smart Academy Gym",
      phone: "+55 000-00-000",
      latitude: new Decimal(-9.14004563423767),
      logitude: new Decimal(13.42892328881449),
    });

    const { gyms } = await sut.execute({
      userLatitude: -8.863744,
      userLongitude: 13.254656,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
