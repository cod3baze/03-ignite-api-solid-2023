import { Gym, Prisma } from "@prisma/client";

import { FindManyNearbyDTO } from "@/dtos/GymsDTO";

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: FindManyNearbyDTO): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
}
