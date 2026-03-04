import http from "node:http"
import { randomUUID } from "node:crypto"

const informacoesAlunos = [
  {
    "id": randomUUID(),
    "nomeAluno": "Receputi",
    "materiaAluno": "Introducao ao Node JS",
    "notaAluno": "10"
  }
]

const server = http.createServer((request, response) => {
  const { method, url } = request
  
  if (method === "GET" && url === "/alunos") {
    response.writeHead(200, {"content-type":"application/json"})
    response.end(JSON.stringify(informacoesAlunos))
  }

  else {
    response.writeHead(404, {"content-type":"application/jsop"})
    response.end(JSON.stringify({Mensagem: "Rota nao encontrada"}))
  }
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})