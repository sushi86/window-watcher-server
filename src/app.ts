import * as WebSocket from 'ws';
import {Connection} from "./models/connection";

console.log('Server gestartet...');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket: WebSocket) => {
  console.log('Neue Verbindung hergestellt.');
  
  const connection = new Connection();
  connection.saveConnection();

  socket.on('message', (message: string) => {
    console.log(`Nachricht empfangen: ${message}`);

    // Hier kannst du auf die empfangene Nachricht reagieren und ggf. Daten an den Client zurückschicken
    socket.send('Nachricht erhalten.');
  });

  socket.on('close', () => {
    console.log('Verbindung geschlossen.');
    connection.saveDisconnection();
  });
});