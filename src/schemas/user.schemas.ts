import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'usuarios' })
export class User {
  @Prop()
  usuario: string;

  @Prop()
  email: string;

  @Prop()
  hashPassword: string;

  @Prop()
  salPassword: string;

  @Prop()
  about: string;

  @Prop()
  perfil: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
