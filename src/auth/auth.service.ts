/* eslint-disable prettier/prettier */
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, UnauthorizedException , BadRequestException } from "@nestjs/common";
import { Authdto } from "./dto";
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    async login(values: Authdto) {
        const { email, password } = values;

        // 1️⃣ **Check if user exists in DB**
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // 2️⃣ **Verify password**
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        console.log("User Logged In:", { email });
        const payload = { sub: user.id, username: user.name };
        // 3️⃣ **Return user data (without password)**
        return {
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                accessToken: this.jwtService.sign(payload),
            },
        };
    }

    async signin(values: Authdto) {
        const { email, password } = values;

        // 1️⃣ **Check if the user already exists**
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        // 2️⃣ **Hash the password**
        const hashedPassword = await argon2.hash(password);

        // 3️⃣ **Store the user in the database**
        const newUser = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        console.log("New User Signed Up:", { email });

        // 4️⃣ **Return user data (excluding password)**
        return {
            message: "Signup successful",
            user: {
                id: newUser.id,
                email: newUser.email,
            },
        };
    }


    
}

