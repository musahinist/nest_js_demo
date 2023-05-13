import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto, user: User) {
    return await this.prisma.note.create({
      data: {
        ...createNoteDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async findAll(user: User) {
    return await this.prisma.note.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
