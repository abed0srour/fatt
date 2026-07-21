import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
} from "@nestjs/common";
import { MissYouService } from "./miss-you.service";

const MESSAGE_MAX_LENGTH = 500;

@Controller("miss-you")
export class MissYouController {
  // Explicit token: tsx/esbuild cannot emit design:paramtypes metadata.
  constructor(
    @Inject(MissYouService) private readonly missYouService: MissYouService
  ) {}

  @Post()
  async sendMissYouToo(
    @Headers("user-agent") userAgent = "",
    @Body() body?: { message?: unknown }
  ) {
    let message: string | undefined;

    if (body?.message != null) {
      if (typeof body.message !== "string") {
        throw new BadRequestException("message must be a string");
      }
      message = body.message.trim().slice(0, MESSAGE_MAX_LENGTH) || undefined;
    }

    const response = await this.missYouService.create(userAgent, message);

    return {
      message: "Message sent, hope we meet again",
      response,
    };
  }

  @Get()
  async listResponses() {
    return {
      responses: await this.missYouService.findAll(),
    };
  }
}
