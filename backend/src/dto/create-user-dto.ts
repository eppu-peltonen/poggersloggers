import { PartialType } from "@nestjs/mapped-types";
import { UserDto } from "./user-dto";
import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto extends PartialType(UserDto) {

  @IsNotEmpty()
  @Length(4)
  username: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}