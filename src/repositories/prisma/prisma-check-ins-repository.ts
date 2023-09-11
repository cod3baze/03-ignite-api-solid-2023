import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async save(data: CheckIn) {
    return await prisma.checkIn.update({
      where: { id: data.id },
      data: data,
    });
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({ data });
  }

  async findById(id: string) {
    return await prisma.checkIn.findUnique({ where: { id } });
  }

  async findByUserIdOnDate(user_id: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    return await prisma.checkIn.findFirst({
      where: {
        user_id,
        created_at: {
          // checkIn que tenha sido feito entre o começo e o fim do dia
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
  }

  async findManyByUserId(user_id: string, page: number) {
    return await prisma.checkIn.findMany({
      where: { user_id },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async countByUserId(user_id: string) {
    return await prisma.checkIn.count({
      where: { user_id },
    });
  }
}
