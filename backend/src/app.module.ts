import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service"
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { join } from "path";
import { JwtModule } from "@nestjs/jwt";
import { PolarModule } from './polar/polar.module';

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
                host: configService.get<string>("DB_HOST"),
                port: +configService.get<number>("DB_PORT"),
                username: configService.get<string>("DB_USERNAME"),
                password: configService.get<string>("DB_PASSWORD"),
                database: configService.get<string>("DATABASE"),
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
        PolarModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .forRoutes("*");
    }
}
