import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './create-note.dto';
import { UpdateNoteDto } from './update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository} from 'typeorm';
@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}
  //   CRUD 
    // Fetch all notes from the database
    async fetchNotes(): Promise<Note[]> {
        return this.noteRepository.find();
      }
       // Fetch a single note by ID from db
  async fetchNoteById(id: string): Promise<Note> {
    const found = await this.noteRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Note "${id}" not found`);
    }
    return found;
  }
//    Add a new note to the database
async addNote(createNoteDto: CreateNoteDto): Promise<Note> {
  const { title, content, rating } = createNoteDto;
  const note = this.noteRepository.create({
    title,
    content,
    rating
  });
  await this.noteRepository.save(note);
  return note;
}


  async removeNote(id: string) {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A note "${id}" was not found`);
    }
    return { message: 'Note successfully deleted' };
  }
  // Update a note by ID with new data
  async updateNote(id: string, updateNoteDto: UpdateNoteDto) {
    const hasNote = await this.fetchNoteById(id);
    if (!hasNote) throw new Error(`A note "${id}" was not found`);
    await this.noteRepository.update(id, updateNoteDto);
  }
}