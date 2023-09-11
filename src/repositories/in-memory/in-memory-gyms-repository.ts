import { randomUUID } from "node:crypto";
import { Gym, Prisma } from "@prisma/client";

import { GymsRepository } from "../gyms-repository";
import { FindManyNearbyDTO } from "@/dtos/GymsDTO";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      logitude: new Prisma.Decimal(data.logitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page + 20);
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyDTO) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude,
          longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.logitude.toNumber(),
        }
      );

      return distance <= 10; // max 10km
    });
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) return null;

    return gym;
  }
}
