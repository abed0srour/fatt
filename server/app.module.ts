import { Module } from "@nestjs/common";
import { MissYouModule } from "./miss-you/miss-you.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [MissYouModule],
  providers: [PrismaService],
})
export class AppModule {}
