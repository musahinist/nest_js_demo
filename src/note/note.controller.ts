import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtGuard } from 'src/auth/guard';
import { CurrentUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
@UseGuards(JwtGuard)
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('create')
  create(@Body() createNoteDto: CreateNoteDto, @CurrentUser() user: User) {
    return this.noteService.create(createNoteDto, user);
  }

  @Get('all')
  findAll(@CurrentUser() user: User) {
    return this.noteService.findAll(user);
  }

  @Get('one')
  findOne(@Query('id') id: string) {
    console.log(id);
    return this.noteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
