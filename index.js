import http from "node:http"
import { randomUUID } from "node:crypto"

const informacoesAlunos = [
  {
    "idAluno": randomUUID(),
    "nomeAluno" : "Pedro",
    "materiaAluno" : "Back end com node JS",
    "notaAluno" : "10"
  }
]

const server = http.createServer((request, response) => {
  const { method, url } = request

  if (url === "/alunos" && method === "GET") {
    response.writeHead(200, {"content-type" : "application/json"})
    response.end(JSON.stringify(informacoesAlunos))
  }

  else {
    response.writeHead(404, {"content-type" : "application/json"})
    response.end(JSON.stringify({Mensagem: "Rota nao encontrada"}))
  }
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})