import { Module } from '@nestjs/common';
import { Note } from './note/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'test',
      password: 'test123',
      database: 'Note',
      options: {
        encrypt: false, // MSSQL-specific option
      },
      synchronize: true, //use this with development environment
      entities: [Note],
    }),

    NoteModule,
  ],
})
export class AppModule {}
