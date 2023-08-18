import * as WebSocket from 'ws';
import {Connection} from "./models/connection";

console.log('Server gestartet...');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket: WebSocket, req: any) => {
  console.log('Neue Verbindung hergestellt.');
  console.log(req.rawHeaders);

  const clientId = req.rawHeaders['clientId'] ?? makeid(6);

  console.log("clientId:", clientId);
  
  const connection = new Connection(clientId);
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

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}