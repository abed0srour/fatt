import { Controller, Get, Headers, Post } from "@nestjs/common";
import { MissYouService } from "./miss-you.service";

@Controller("miss-you")
export class MissYouController {
  constructor(private readonly missYouService: MissYouService) {}

  @Post()
  async sendMissYouToo(@Headers("user-agent") userAgent = "") {
    const response = await this.missYouService.create(userAgent);

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
