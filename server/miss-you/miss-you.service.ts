import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

interface ResponseRecord {
  id: string;
  createdAt: Date;
  device: string | null;
  userAgent: string | null;
}

function detectDevice(userAgent: string): string {
  if (/iPad|Tablet/i.test(userAgent)) return "Tablet";
  if (/Mobile|iPhone|Android/i.test(userAgent)) return "Phone";
  return "Computer";
}

function serialize(row: ResponseRecord) {
  return {
    id: row.id,
    created_at: row.createdAt.toISOString(),
    device: row.device,
  };
}

@Injectable()
export class MissYouService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userAgent: string) {
    const row = await this.prisma.missYouResponse.create({
      data: {
        device: detectDevice(userAgent),
        userAgent,
      },
    });

    return serialize(row);
  }

  async findAll() {
    const rows = await this.prisma.missYouResponse.findMany({
      orderBy: { createdAt: "desc" },
    });

    return rows.map(serialize);
  }
}
