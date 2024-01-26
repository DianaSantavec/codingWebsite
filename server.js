const express = require('express');
const { exec } = require('child_process');
const WebSocket = require('ws');

const app = express();
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    exec(message, (error, stdout, stderr) => {
      if (error) {
        ws.send(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        ws.send(`stderr: ${stderr}`);
        return;
      }
      ws.send(`stdout: ${stdout}`);
    });
  });
});

const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});