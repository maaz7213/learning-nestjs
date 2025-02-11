/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "khan1234",
      database: "bookmark",
      entities: [__dirname + "/**/*.entity{.ts,.js}"], // Adjust the path to match your project structure
      synchronize: true, // For development only; set to false in production
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
})
export class AppModule {}
