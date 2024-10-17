import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'usuarios' })
export class User {
  @Prop({ required: true, unique: true })
  usuario: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  hashPassword: string;

  @Prop()
  salPassword: string;

  @Prop()
  about: string;

  @Prop()
  perfil: number;

  @Prop({ default: false })
  emailConfirmed: boolean;

  @Prop()
  confimationToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
