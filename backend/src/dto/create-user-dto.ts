import { PartialType } from "@nestjs/mapped-types";
import { UserDto } from "./user-dto";
import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends PartialType(UserDto) {

  @IsNotEmpty()
  @Length(4)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @Length(4)
  @ApiProperty()
  password: string;
}