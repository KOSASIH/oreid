const addProxyRoutes = require('./src/setupProxy.js')
const path = require('path');
const express = require('express');

const PORT = 8080;

try {
  const app = express();

  addProxyRoutes(app) // shares setup with Create React App dev server

  // Hosts Frontend - Static files built with npm run build
  app.use('/', express.static(`${__dirname}/build`));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/build/index.html`));
  });

  app.listen(PORT, () => {
    console.log(`Service is now running on {server}:${PORT}`);
  });
} catch (error) {
  console.log(error);
}