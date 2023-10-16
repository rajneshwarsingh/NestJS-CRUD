import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import config from './config/config';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: config.dbDialect, // Type casting to any as Sequelize expects a string for the dialect
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUsername,
      password: config.dbPassword,
      database: config.database,
      autoLoadModels: true,
      synchronize: true,
      logging: Boolean(config.dbLogger),
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
})
export class AppModule {}
