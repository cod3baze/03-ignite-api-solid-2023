import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-1",
      title: "JavaScript Gym",
      phone: "",
      description: "",
      latitude: new Decimal(0),
      logitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check-in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check-in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      sut.execute({
        userId: "user-1",
        gymId: "gym-1",
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check-in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant Gym", async () => {
    gymsRepository.items.push({
      id: "gym-2",
      title: "JavaScript Gym",
      phone: "",
      description: "",
      latitude: new Decimal(-9.1174789),
      logitude: new Decimal(13.4879438),
    });

    await expect(() =>
      sut.execute({
        userId: "user-1",
        gymId: "gym-2",
        userLatitude: -8.863744,
        userLongitude: 13.254656,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
