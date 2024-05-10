import { Controller, Get, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { Request } from "express";

@Controller("test")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("something")
  getHello(): string {
    return this.appService.getHello();
  }
}
