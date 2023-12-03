import { Body, Controller, Delete, Get, Param, Post,Put} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './create-note.dto';
import { UpdateNoteDto } from './update-note.dto';
import { Note } from './note.entity';

@Controller('notes')
export class NoteController {
  constructor(private readonly notesService: NoteService) {}

  //  all notes
  @Get()
  getNotes() {
    return this.notesService.fetchNotes();
  }

  // Create a new note
  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.addNote(createNoteDto);
  }

  // Retrieve a note by ID
  @Get('/:id')
  getNoteById(@Param('id') id: string): Promise<Note> {
    return this.notesService.fetchNoteById(id);
  }

  // Delete a note by ID
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.notesService.removeNote(id);
  }

  // Update a note by ID
  @Put('/:id')
  async updateNote(@Param('id') id: string, @Body() data: UpdateNoteDto) {
    const note = new Note();
    Object.assign(note, data);
    await this.notesService.updateNote(id, note);
    return { message: 'Note info successfully updated', id };
  }
}