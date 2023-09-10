import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { Decimal } from "@prisma/client/runtime";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-in counts", async () => {
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-fake",
    });
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-new",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
