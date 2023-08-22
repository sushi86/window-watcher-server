import * as WebSocket from 'ws';
import {Connection} from "./models/connection";

console.log('Server gestartet...');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws, req) => {
  console.log('Neue Verbindung hergestellt.');
  console.log(`Conn Url ${req.url}`);
  const urlParams = new URLSearchParams(req.url.replace('/?',''));
  const clientId = urlParams.get('clientId') ?? makeid(6)
  
  const connection = new Connection(clientId);
  connection.saveConnection();

  ws.on('message', (message: string) => {
    console.log(`Nachricht empfangen: ${message}`);

    // Hier kannst du auf die empfangene Nachricht reagieren und ggf. Daten an den Client zurückschicken
    ws.send('Nachricht erhalten.');
  });

  ws.on('close', () => {
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