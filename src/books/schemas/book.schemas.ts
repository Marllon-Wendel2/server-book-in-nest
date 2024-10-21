import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Comentario } from './comentarios.schemas';

export type UserDocument = HydratedDocument<Book>;

@Schema({ collection: 'livros' })
export class Book {
  @Prop({ required: true, unique: true })
  titulo: string;

  @Prop({ required: true, unique: true })
  src: string;

  @Prop({ required: true, unique: true })
  comentarios: Array<Comentario>;
}

export const BookSchema = SchemaFactory.createForClass(Book);
