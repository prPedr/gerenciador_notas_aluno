import http from "http"
import { randomUUID } from "crypto"

const informacoesAlunos = [
  {
    "id": randomUUID,
    "nomeAluno": "Pedro Nascimento",
    "materiaAluno": "Back end em node",
    "notaAluno": "10"
  }
]

const server = http.createServer((request, response) => {
  const { method, url } = request

  let body = ""

  request.on("data", partesRequisicao => {
    body += partesRequisicao.toString()
  })

  request.on("end", () => {
    if (method === "GET" && url === "/alunos") {
      response.writeHead(200, { "content-type":"application/json" })
      response.end(JSON.stringify(informacoesAlunos))
    } else if (method === "POST" && url === "/alunos") {
      const { nomeAluno, materiaAluno, notaAluno } = JSON.parse(body)
      const novasInformacoesAluno = {id: randomUUID, nomeAluno, materiaAluno, notaAluno}

      informacoesAlunos.push(novasInformacoesAluno)
      response.writeHead(201, { "content-type":"application/json" })
      response.end(JSON.stringify(novasInformacoesAluno))
    } else {
      response.writeHead(404, { "content-type":"application/json" })
      response.end(JSON.stringify({Mensagem: "Rotao nao encontrada"}))
    }
  })
})

const porta = 3333

server.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})