import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Comentario>;

@Schema()
export class Comentario {
  @Prop({ required: true })
  autor: string;

  @Prop({ required: true, unique: true })
  conteudo: string;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);
