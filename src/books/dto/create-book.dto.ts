import { Comentario } from '../schemas/comentarios.schemas';

export class CreateBookDto {
  titulo: string;
  src: string;
  comentarios: Array<Comentario>;
}
