const express = require('express')
const http = require('http')
const app = express()


app.all('*', (req, res, next) => {
  next()
})

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  const ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress
  const lang = req.headers['accept-language'].split(',')[0]
  const os = req.headers['user-agent'].split('(')[1].split(')')[0]
  const json = JSON.stringify({ ipaddress: ip, language: lang, software: os })
  res.end(json)
})

app.get('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('404!')
})
const port = process.env.PORT || 8080
http.createServer(app).listen(port)
console.log('Server Running')
