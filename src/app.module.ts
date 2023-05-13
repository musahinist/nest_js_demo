import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { ExampleModule } from './example/example.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,

    PrismaModule,
    ExampleModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
