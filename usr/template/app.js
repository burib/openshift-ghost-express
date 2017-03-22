var http = require('http'),
  fs = require('fs'),
  path = require('path'),
  sysInfo = require('./utils/sys-info'),
  env = process.env,
  ghost = require('ghost'),
  express = require('express'),
  app = express();

ghost({
  config: path.join(__dirname, '/ghost_settings/config.js')
}).then(function(ghostServer) {
  app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
  ghostServer.start(app);

  app.get('/', function(req, res) {
    res.send('Hello node express app..');
  }).get('/health', function(req, res) {
    res.writeHead(200);
    res.end();
  }).get('/stats', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.getStats()));
  });
});