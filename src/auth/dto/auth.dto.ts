/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Authdto {

  @IsEmail()
  @IsNotEmpty()
  email: string;
 
  @IsNotEmpty()
  @IsString()  // Added parentheses here
  password: string;
}