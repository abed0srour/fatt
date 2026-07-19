import { Module } from "@nestjs/common";
import { MissYouController } from "./miss-you.controller";
import { MissYouService } from "./miss-you.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [MissYouController],
  providers: [MissYouService, PrismaService],
})
export class MissYouModule {}
