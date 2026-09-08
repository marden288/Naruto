const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mp4': 'video/mp4'
};

http.createServer((request, response) => {
  const requestedPath = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.resolve(root, `.${requestedPath}`);

  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream'
  });
  fs.createReadStream(filePath).pipe(response);
}).listen(8000, '127.0.0.1', () => {
  console.log('Open http://localhost:8000 in your browser.');
});
