import http from "node:http"
import { randomUUID } from "node:crypto"

const informacoesAluno = [
  {
    "idAluno" : randomUUID(),
    "nomeAluno" : "Pedro Nascimento",
    "materiaAluno" : "Back end com Node.js",
    "notaAluno" : "10"
  }
]

const server = http.createServer((request, response) => {
  const { method, url } = request

  if (url === "/alunos" && method === "GET") {
    response.writeHead(200, {"content-type" : "application/json"})
    response.end(JSON.stringify(informacoesAluno))
  }

  else {
    response.writeHead(404, {"content-type" : "application/json"})
    response.end(JSON.stringify({Mensagem : "Rota nao encontrada"}))
  }
})

const porta = 3111

server.listen(porta, () => {
  console.log(`Servido rodando em http://localhost:${porta}`)
})