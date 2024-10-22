import { Logger } from '@nestjs/common';
import {
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

  // @SubscribeMessage('message')
  // handleMessage(client: Socket, payload: string): void {
  //   client.emit('message', { payload, id: client.id });
  // }

  @SubscribeMessage('books')
  async handleBook(client: Socket): Promise<void> {
    try {
      const books = await this.chatService.getAllMessages();
      this.logger.log(`Received message from ${client.id}`);
      this.logger.log(books);
      client.emit('books', books);
    } catch (error) {
      this.logger.error('Error fetching books', error);
    }
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket, data: string): void {
    this.logger.log(`Received ping from ${client.id}`);
    this.server.emit('pong', 'OK');
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
