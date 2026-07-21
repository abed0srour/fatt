import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

interface ResponseRecord {
  id: string;
  createdAt: Date;
  device: string | null;
  userAgent: string | null;
  message: string | null;
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
    message: row.message,
  };
}

@Injectable()
export class MissYouService {
  // Explicit token: tsx/esbuild cannot emit design:paramtypes metadata.
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService
  ) {}

  async create(userAgent: string, message?: string) {
    const row = await this.prisma.missYouResponse.create({
      data: {
        device: detectDevice(userAgent),
        userAgent,
        message: message || null,
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
