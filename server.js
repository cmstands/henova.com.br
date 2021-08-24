const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = 4002
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const express = require('express');

app.prepare().then(() => {
  const server = express();

  server.use(express.static('static', { dotfiles: 'allow' }));

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query = {} } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      return handle(req, res, parsedUrl);
    }
    
  });

  server.listen(port, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port + '');
  })
  
})
