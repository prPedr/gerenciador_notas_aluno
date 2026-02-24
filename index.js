import http from "http"

const porta = 3333

const server = http.createServer((request, response) => {
  response.end("Hello World!")
})

server.listen(porta, () => {
  console.log(`Servidor rodando http://localhost:${porta}/`)
})