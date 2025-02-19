/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,  // Makes config available everywhere
    envFilePath: '.env', // Path to .env file
  }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
