import http from "http"

const server = http.createServer((request, response) => {
  response.end("Hello World!")
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}/`)
})