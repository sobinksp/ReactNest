import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StandardModule } from './standard/standard.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    }),
    StandardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
