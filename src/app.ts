import { Server, Socket } from 'socket.io';
import express, { Request, Response } from 'express';
import * as http from 'http';
import * as path from 'path';

const PORT = 8081;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve('./index.html'));
});

try {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on('message', (msg: string) => {
      io.emit('message', `${socket.id}: ${msg}`);
    });
  });
} catch (error) {
  console.error('Connection error', error);
}
