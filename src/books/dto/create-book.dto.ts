import { Comentario } from '../entities/comentarios.schemas';

export class CreateBookDto {
  titulo: string;
  src: string;
  comentarios: Array<Comentario>;
}
