var path = require('path')
var express = require("express")
var http = require("http")
var app = express()


app.all("*", function(req, res, next) {
  next();
});

app.get("/", function(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  var lang = req.headers['accept-language'].split(",")[0];
  var os = req.headers['user-agent'].split("(")[1].split(")")[0];
  var json = JSON.stringify({"ipaddress":ip,"language":lang,"software":os});
  res.end(json);
});

app.get("*", function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("404!");
});
var port = process.env.PORT || 8080;
http.createServer(app).listen(port);
console.log("Server Running");
