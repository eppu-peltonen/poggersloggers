import { Module } from "@nestjs/common";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service"
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { join } from "path";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: "db",
                port: +configService.get("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DATABASE"),
                autoLoadEntities: true,
                synchronize: true,
                entities: [join(__dirname, "**", "*.entity.{ts,js}")]
            }),
            dataSourceFactory: async (options) => {
                const dataSource = await new DataSource(options).initialize();
                return dataSource;
            },
        }),
        AuthModule,
        UsersModule,
        JwtModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
