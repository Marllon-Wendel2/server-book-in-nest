import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Comentario>;

@Schema()
export class Comentario {
  @Prop({ required: true, unique: true })
  autor: string;

  @Prop({ required: true, unique: true })
  conteudo: string;
}
