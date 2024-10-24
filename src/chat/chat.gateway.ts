import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    client.emit('message', { payload, id: client.id });
  }

  @SubscribeMessage('Send')
  async handleNewMenssage(
    client: Socket,
    @MessageBody() data: { id: string; autor: string; message: string },
  ): Promise<void> {
    const { id, autor, message } = data;
    await this.chatService.addMessage(id, autor, message);
  }

  @SubscribeMessage('books')
  async handleBook(client: Socket, title: string): Promise<void> {
    try {
      const books = await this.chatService.getAllMessages();
      const titleFormated = title.toLowerCase();
      const comentarios = books.filter((book) =>
        book.titulo.toLowerCase().includes(titleFormated),
      );
      this.logger.log(`Received message from ${client.id}`);
      client.emit('books', comentarios);
    } catch (error) {
      this.logger.error('Error fetching books', error);
    }
  }

  afterInit(server: Server) {
    this.logger.log('Servidor ws criado com seucesso');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
